import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi';
import {ErrorContext, Modal, useModal} from '../../components';

export default function GameDetails() {
    const { gameId } = useParams();
    const [ game, error ] = useApi(`games/${gameId}`);
    const {setMessage} = useContext(ErrorContext)
    const {modalProps, openModal} = useModal();
    
    const [values, setValues] = useState({
        title: '',
        genre: '',
    });
    useEffect(() => { 
        if(game) {
            setValues(game);
        }
    }, [game]);

    function handleInputChange(e){
        // const newValues = {
        //     ...values,
        // };

        // newValues[e.target.name] = e.target.value;
        setValues({...values, [e.target.name]: e.target.value});
    }   

    function handleSubmit() {
        console.log(values);
    }

    if(error) {
        setMessage('error');
    }

    if(!game) {
        return <h1>Loading ...</h1>;
    }

    console.log({game});

    return (
        <div>
            <h1>{ game.title }</h1>
            <button className="btn btn-primary" onClick={openModal}>Edit Game</button>
            <Modal {...modalProps} title={`Editing: ${game.title}`} onSave={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" name="title" onChange={handleInputChange} value={values.title} />
                        {values.title}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="genre" className="col-sm-2 col-form-label">Genre</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="genre" name="genre" onChange={handleInputChange} value={values.genre} />
                        {values.genre}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
