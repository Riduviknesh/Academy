import { useState, useEffect } from "react";
import {Layout} from '../User/Layout';
import axios from "../Admin/Config/axios";
import { Form, Button, Card} from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap';
import { useNavigate } from "react-router";
import ReactPlayer from "react-player";


function Mylearning() {
  
    
    return (
        <div>
        <Layout/>
        <ReactPlayer url='https://youtu.be/6msbe_CAhf4'></ReactPlayer>

           
    </div>
    );
}
export default Mylearning;