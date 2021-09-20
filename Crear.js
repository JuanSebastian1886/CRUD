import React from 'react';
import {Link} from "react-router-dom";
import Api from "../servicios/api";

class Crear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nPredial:"",
            nPredio:"",
            departamento:"",
            municipio:"",
            avaluo:"",
            nPropietario:"",
            errores:[]
        }
    }
    cambioValor =(e)=>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({ state,errores:[]});
    }

    verificarError(elemento){
        return this.state.errores.indexOf(elemento) !==-1;
    }

    enviarDatos = (e) =>{
        e.preventDefault();

        const{nPredial,nPredio,departamento,municipio,avaluo,nPropietario}=this.state;
        console.log(nPredial);
        console.log(nPredio);
        console.log(departamento);
        console.log(municipio);
        console.log(avaluo);
        console.log(nPropietario);

        var errores=[];
        if(!nPredial)errores.push("error_nPredial");
        if(!nPredio)errores.push("error_nPredio");
        if(!departamento)errores.push("error_departamento");
        if(!municipio)errores.push("error_municipio");
        if(!avaluo)errores.push("error_avaluo");
        if(!nPropietario)errores.push("error_nPropietario");

        this.setState({errores:errores});
        if(errores.length>0)return false;

        var datosEnviar=({nPredial:nPredial,nPredio:nPredio,
            departamento:departamento,municipio:municipio,avaluo:avaluo,nPropietario:nPropietario})

        fetch(Api+"?insertar=1",{
            method:"POST",
            body:JSON.stringify(datosEnviar)
        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log(datosRespuesta);
            this.props.history.push("/")
        })
        .catch(console.log)
    }

    render() {
        
        const{nPredial,nPredio,departamento,municipio,avaluo,nPropietario}=this.state;

        return (
            <div className="card">
                <div className="card-header">
                    Registro de datos
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviarDatos}>
                        <div className="form-group">
                          <label htmlFor="">Numero Predial:</label>
                          <input required type="text" name="nPredial" onChange={this.cambioValor} value={nPredial} id="nPredial" className={((this.verificarError("error_nPredial"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escriba el predial</small>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Nombre predio:</label>
                          <input required type="text" name="nPredio" onChange={this.cambioValor} value={nPredio}  id="nPredio" className={((this.verificarError("error_nPredio"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escriba el nPropietario del predio</small>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Departamento:</label>
                          <input required type="text" name="departamento" onChange={this.cambioValor} value={departamento}  id="departamento" className={((this.verificarError("error_departamento"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escriba el departamento</small>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Municipio:</label>
                          <input required type="text" name="municipio" onChange={this.cambioValor} value={municipio}  id="municipio" className={((this.verificarError("error_municipio"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escriba el municipio donde se ubica el predio</small>
                        </div>

                        <div className="form-group">
                          <label htmlFor="">Avaluo:</label>
                          <input required type="text" name="avaluo" onChange={this.cambioValor} value={avaluo}  id="avaluo" className={((this.verificarError("error_avaluo"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escriba el avaluo</small>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="">Nombre propietario:</label>
                          <input required type="text" name="nPropietario" onChange={this.cambioValor} value={nPropietario}  id="nPropietario" className={((this.verificarError("error_nPropietario"))?"is-invalid":"")+" form-control"} placeholder="" aria-describedby="helpId"/>
                          <small id="helpId" className="invalid-feedback">Escriba el nombre del propietario</small>
                        </div>

                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Agregar registro</button>
                            <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                        </div>


                    </form>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
         );
    }
}
 
export default Crear;