import React from 'react';
import {Link} from "react-router-dom";
import Api from "../servicios/api";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datosCargados:false,
            registro:[]
        }
    }

    cambioValor =(e)=>{
        const state=this.state.registro;

        state[e.target.name]=e.target.value;
        this.setState({registro:state});
    }

    enviarDatos = (e) =>{
        e.preventDefault();
        console.log("Formulario enviado...");
        const{nPredial,nPredio,departamento,municipio,avaluo,nPropietario}= this.state.registro;

        console.log(nPredial);
        console.log(nPredio);
        console.log(departamento);
        console.log(municipio);
        console.log(avaluo);
        console.log(nPropietario);

        var datosEnviar={
            nPredial:nPredial,
            nPredio:nPredio,
            departamento:departamento,
            municipio:municipio,
            avaluo:avaluo,
            nPropietario:nPropietario}

        fetch(Api+"?actualizar=1",{
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

    componentDidMount(){
        console.log(this.props.match.params.id);
    

        fetch(Api+"?consultar="+this.props.match.params.id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            console.log("=>"+datosRespuesta);

            this.setState({
                datosCargados:true,
                registro:datosRespuesta[0]})
        })
        .catch(console.log)
    }

    render() { 
        const{datosCargados,registro}=this.state

        if(!datosCargados){
            return(<div>Cargando....</div>)
        }else{
            return (<div className="card">
                <div className="card-header">
                    Editar registros
                </div>
                <div className="card-body">
                    
                    <form onSubmit={this.enviarDatos}>

                    <div className="form-group">
                      <label htmlFor="">Numero de predial</label>
                      <input type="text" readOnly className="form-control" value={registro.nPredial}
                      onChange={this.cambioValor} name="nPredial" id="nPredial" aria-describedby="helpId" placeholder=""/>
                      <small id="helpId" className="form-text text-muted">Numero de predial</small>
                    </div>

                            <div className="form-group">
                            <label htmlFor="">Nombre predio:</label>
                            <input type="text" name="nPredio" onChange={this.cambioValor} value={registro.nPredio} id="nPredio" className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Escribe el nombre del predio</small>
                            </div>

                            <div className="form-group">
                            <label htmlFor="">Departamento:</label>
                            <input type="text" name="departamento" onChange={this.cambioValor} value={registro.departamento}  id="departamento" className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Escribe el departamento</small>
                            </div>
                            
                            <div className="form-group">
                            <label htmlFor="">Municipio:</label>
                            <input type="text" name="municipio" onChange={this.cambioValor} value={registro.municipio} id="municipio" className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Escribe el municipio</small>
                            </div>
                            
                            <div className="form-group">
                            <label htmlFor="">Avaluo:</label>
                            <input type="text" name="avaluo" onChange={this.cambioValor} value={registro.avaluo} id="avaluo" className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Escribe el avaluo</small>
                            </div>
                            
                            <div className="form-group">
                            <label htmlFor="">Nombre del propietario:</label>
                            <input type="text" name="nPropietario" onChange={this.cambioValor} value={registro.nPropietario} id="nPropietario" className="form-control" placeholder="" aria-describedby="helpId"/>
                            <small id="helpId" className="text-muted">Escribe el nombre del propietario</small>
                            </div>
                            

                            <div className="btn-group" role="group" aria-label="">
                                <button type="submit" className="btn btn-success">Actualizar predio</button>
                                <Link to={"/"} className="btn btn-primary">Cancelar</Link>
                            </div>


                        </form>

                </div>
                <div className="card-footer text-muted">
                </div>
            </div> );
        }
    }
}
 
export default Editar;