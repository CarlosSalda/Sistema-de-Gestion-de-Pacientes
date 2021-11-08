const { response, json } = require('express');
const mongoose = require('mongoose');
const Patient = mongoose.model('Patient')

exports.patient_register = async function (req, res) {
    try {
        const body = req.body
        const date = new Date()

        if (body.isNn) {
            const patientNn = await Patient.create({
                name: '', surname: '', dni: "", street: '', number: '',
                floor: '', zipCode: '', location: '', state: '',
                isNn: body.isNn, clinicHistory: '', sympthoms: body.sintomas, hasExtraSympthoms: body.bSintomasExtras,
                dataExtraSympthoms: body.sintomasExtras, dataNN: body.infoNN, entryDate: date, turnState: 'WAITTING'
            })

            return res.status(201).json({
                response: 'Paciente NN ingresado con exito!',
                data: patientNn
            })
        } else if (!body.isNn && (body.nombre.trim() === '' || body.apellido.trim() === '' || body.dni.trim() === '')) {
            return res.status(400).json({
                response: 'Error al Ingresar, paciente sin datos personales'
            })
        }

        const patient = await Patient.create({
            name: body.nombre, surname: body.apellido, dni: body.dni, street: body.calle, number: body.numero,
            floor: body.piso, zipCode: body.codigo_postal, location: body.localidad, state: body.provincia,
            isNn: body.isNn, clinicHistory: '', sympthoms: body.sintomas, hasExtraSympthoms: body.bSintomasExtras,
            dataExtraSympthoms: body.sintomasExtras, dataNN: body.infoNN, entryDate: date, turnState: 'WAITTING', born: body.born
        })

        res.status(201).json({
            response: `Paciente ${patient.name} ${patient.surname} ingresado con Exito!`,
            data: patient
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.get_all_patients = async function (req, res) {
    try {
        const patients = await Patient.find();
        res.status(200).json({ response: 'todos los pacientes', data: patients });
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.get_waiting_patients = async function (req, res) {
    try {
        const patients = await Patient.find({turnState: { $in: [ 'WAITTING', 'ATTENDING']}});
        res.status(200).json({ response: 'pacientesEsperando', data: patients });
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}


exports.get_confirm_patients = async function (req, res) {
    try {
        const patients = await Patient.find({turnState: { $in: [ 'CONFIRMCASO', 'ATTENDING']}});
        res.status(200).json({ response: 'confirmacionPacientes', data: patients });
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.get_attended_patients = async function (req, res) {
    try {
        const patients = await Patient.find({ turnState: 'ATTENDED' })

        res.status(200).json({ response: 'pacientes atendidos', data: patients });
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.get_attending_patients = async function (req, res) {
    try {
        const patients = await Patient.find({ turnState: 'ATTENDING' })

        res.status(200).json({ response: 'pacientes atendidos', data: patients });
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}


exports.get_firts_waitting_patients = async function (req, res) {
    try {
        const patients = await Patient.find({turnState: 'WAITTING'})

        res.status(200).json({ response: 'pacientes en espera', data: patients[0] });
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.delete_patient = async function (req, res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                response: 'No se pasó ningún Id como parametro'
            })
        }

        const patient = await Patient.deleteOne({ _id: req.params.id });

        res.status(200).json({ response: 'Paciente eliminado correctamente!' })

    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}


exports.get_patient_attending= async function (req,res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                response: 'No se pasó ningún Id como parametro'
            })
        }
        
        const patient =await Patient.find({_id: req.params.id},{turnState: 'ATTENDING'});
        res.status(200).json({ response: 'Paciente atendido', date: patient });
    
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}


exports.update_turn_attending = async function (req,res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                response: 'No se pasó ningún Id como parametro'
            })
        }
        
        await Patient.updateOne({_id: req.params.id},{turnState: 'ATTENDING'});
        res.status(200).json({ response: 'Se actualizo el paciente!'});
    
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.update_turn_waitting = async function (req,res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                response: 'No se pasó ningún Id como parametro'
            })
        }
        
        await Patient.updateOne({_id: req.params.id},{turnState: 'WAITTING'});
        res.status(200).json({ response: 'Se actualizo el paciente!'});
    
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}



exports.updateTurnState = async function (req,res) {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                response: 'No se pasó ningún Id como parametro'
            })
        }
        
        await Patient.updateMany({_id: req.params.id},{turnState: 'ATTENDED'});
        res.status(200).json({ response: 'Se actualizo el paciente!'});
    
    } catch (error) {
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}

exports.update_patient = async function (req, res) {
    try {
        const body = req.body

        if (body.name.trim() === '' || body.surname.trim() === '' || body.dni.trim() === '') {
            return res.status(400).json({
                response: 'Error al Actualizar, paciente sin datos principales'
            })
        }

        const uPatient = await Patient.updateOne({_id: body._id}, {
            name: body.name, surname: body.surname, dni: body.dni, street: body.street, number: body.number,
            floor: body.floor, zipCode: body.zipCode, location: body.location, state: body.state,
            isNn: body.isNn, clinicHistory: '', sympthoms: body.sympthoms, hasExtraSympthoms: body.hasExtraSympthoms,
            dataExtraSympthoms: body.dataExtraSympthoms, dataNN: body.infoNN, born: body.born
        })

        const newData = await Patient.findOne({_id: body._id})

        res.status(201).json({
            data: newData
        });
        
    } catch (error) {
        console.log(res)
        res.status(500).json({
            response: 'Error en el sistema'
        })
    }
}