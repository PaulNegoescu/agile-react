import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {ErrorContext, Modal, useModal} from '../../components';
import {useForm, useApi} from '../../hooks';

export default function GameDetails() {
    const { gameId } = useParams();
    const [ game, error, _, mutate] = useApi(`games/${gameId}`);
    const {setMessage} = useContext(ErrorContext)
    const {modalProps, openModal} = useModal();

    // const initialValues = useMemo(() => ({
    //     title: game?.title ?? '',
    //     genre: game?.genre ?? '',
    //     publisher: game?.publisher ?? '',
    // }), [game]);
    
    const {values, bindInput} = useForm(game);

    function handleSubmit() {
        console.log(values);
        const { _id, ...rest } = values;
        mutate(rest);
    }

    if(error) {
        setMessage('error');
    }
    
    console.log(JSON.stringify(game));
    if(!game) {
        return <h1>Loading ...</h1>;
    }


    return (
        <div>
            <h1>{ game.title }</h1>
            <button className="btn btn-primary" onClick={openModal}>Edit Game</button>
            <Modal {...modalProps} title={`Editing: ${game.title}`} onSave={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="title" {...bindInput('title')} />
                        {values?.title}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="genre" className="col-sm-2 col-form-label">Genre</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="genre" {...bindInput('genre')} />
                        {values?.genre}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="publisher" className="col-sm-2 col-form-label">Publisher</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="publisher" {...bindInput('publisher')} />
                        {values?.publisher}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
