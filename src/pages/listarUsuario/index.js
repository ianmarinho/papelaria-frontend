
import React, { useState,useEffect } from 'react';

import '../../pages/global.css';
import Menu from '../../componentes/menu'
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Link} from 'react-router-dom';
import Head from '../../componentes/menu/Head';
import { useNavigate, link } from 'react-router-dom';



export default function Listausuario() {

    const [dados,setDados] = useState([]);
    const [banco,setBanco] = useState([]);
    const navigate = useNavigate ();

    // jason e apenas o colchete dentro das (chaves array) , suportando variavel e seu valor, assim identificando os itens mais facilmente.

    // const dados = [

    //     { id: 1, nome: "Carlos", email: "carlos@gmail.com", senha: "123" },

    //     { id: 2, nome: "Felipe", email: "carlos@gmail.com", senha: "321" },

    //     { id: 3, nome: "Nilson", email: "carlos@gmail.com", senha: "321" },



    // ]

    useEffect ( ()=>{
    mostrarDados ();
    },[] )

    function mostrarDados ()
    {
        setBanco(JSON.parse(localStorage.getItem("cd-usuarios") || "[]"));
    }

    const  apagar = (id) => {
        confirmAlert({
          title: 'Excluir Usuário',
          message: 'Deseja realmente excluir esse usuário?',
          buttons: [
            {
              label: 'Sim',
              onClick: () => {
                let dadosnovos = banco.filter(item => item.id !== id);
                localStorage.setItem("cd-usuarios", JSON.stringify(dadosnovos));
                setBanco(dadosnovos); // Atualiza o estado com os dados filtrados
                alert(`Você apagou o usuário id:${id}`);
              }
              
            },
            {
              label: 'Não',
              onClick: () => alert('Click No')
            }
          ]
        });
      };

return (
    <div className="dashboard-container">

       

        <div className='menu'>
            <h1>Menu</h1>
            <Menu />
        </div>

        <div className='principal'>

        <Head title = "Lista de Usuário" />

            <Link to="/cadastrousuario"  className='btn-novo'>Novo Cadastro</Link>

            <table >
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>

                </tr>

                {
                    banco.map((usu) => {

                        return (
                            <tr key={usu.toString()}>
                                <td> {usu.id} </td>
                                <td> {usu.nome} </td>
                                <td> {usu.email} </td>
                                <td className='botoes'> 
                                <Link to = {`/editarusuario/${usu.id}`} ><FiEdit color='blue' />
                                </Link> 
                                </td>
                                <td className='botoes'> <FiTrash color='red' onClick={(e)=>apagar(usu.id)}/>
                                </td>

                            </tr>
                        )
                    })
                }

            </table>
        </div>

    </div>
)
}