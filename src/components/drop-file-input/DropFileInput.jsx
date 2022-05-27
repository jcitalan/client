import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './drop-file-input.css';

import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../assets/cloud-upload-regular-240.png';
import Swal from 'sweetalert2'
import { useNavigate  } from 'react-router-dom';
const DropFileInput = props => {

    const navigate = useNavigate();//declaro mi navegacion
    
    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        console.log("Esto es el new file: ");
        if(fileList.length===0){
            if(newFile.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                if (newFile) {
                    const updatedList = [...fileList, newFile];
                    setFileList(updatedList);
                    props.onFileChange(updatedList);
                }
            }else{
                console.log("Solo se puede adjuntar un archivo de excel");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Solo se puede adjuntar un archivo de excel',
                  })
            }
        }else{
            console.log("Elimine un archivo");
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Solo se puede cargar un archivo a la vez!',
              })
        }
        
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        console.log("Aca elimina los archivos");
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }
    const fileSend = (files) => {
        const data = new FormData();//declaro mi form para el envio
        let url = "http://18.221.204.164:80/recibe"//declaro mi endpoint que recibe el archivo
        // let url = "http://127.0.0.1:5000/recibe";
        Array.from(files).forEach(file => {
            data.append('file', file,file.name);
            console.log(data)

            fetch(url, { 
                method: 'POST', 
                body: data 
            })
            .then((response) => { 
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Enviado Correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                console.log(response.json())
                navigate("/chart")
            });
        });
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Arrrasta y suelta tu archivo</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Cargado correctamente
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    {/* {console.log(item.type.split('/')[1]) } */}
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                        <button onClick={() => fileSend(fileList)}>Ver graficas</button>
                    </div>
                    
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
