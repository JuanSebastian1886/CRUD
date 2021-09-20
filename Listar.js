import React from 'react';
import {Link} from "react-router-dom";
import Api from "../servicios/api";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            registro:[]
        }
    }

    borrarRegistros = (nPredial)=> {

        console.log(nPredial);

        fetch(Api+"?borrar="+nPredial)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{

            console.log(datosRespuesta);
            this.cargarDatos();
        })
        .catch(console.log)
        
    }

    cargarDatos(){

        fetch(Api)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.setState({datosCargados:true, registro:datosRespuesta})
        })
        .catch(console.log)

    }

    componentDidMount(){
        this.cargarDatos();
    }

    render() { 
        const{datosCargados, registro}=this.state

        if(!datosCargados){
            return(<div>Cargando....</div>)
        }else{

            return (
                <div className="card">
                    <div className="card-header">
                    <Link className="btn btn-success" to={"/crear"}>Agregar registro</Link>    
                    </div>
                    <div className="card-body">
                        <h4>Lista de registros</h4>
                <table className="table">
                            <thead className="thead">
                                <tr>
                                    <th>Numero predial</th>
                                    <th>Nombre predio</th>
                                    <th>Departamento</th>
                                    <th>Municipio</th>
                                    <th>Avaluo</th>
                                    <th>Nombre propietario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead >
                            <tbody>
                                {registro.map(
                                        (register)=>(
                                        <tr key={register.nPredial}>
                                        <td>{register.nPredial}</td>
                                        <td>{register.nPredio}</td>
                                        <td>{register.departamento}</td>
                                        <td>{register.municipio}</td>
                                        <td>{register.avaluo}</td>
                                        <td>{register.nPropietario}</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="">
                                                <Link className="btn btn-warning" to={"/editar/"+register.nPredial}
                                                
                                                >Editar</Link>
                                                <button type="button" className="btn btn-danger"
                                                onClick={()=>this.borrarRegistros(register.nPredial)}
                                                >Borrar</button>
                                            </div>
                                        </td>
                                    </tr>  
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                   </div>
            );
        }
    }
}

export default Listar;