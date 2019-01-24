import React, { Component } from 'react';
import { Image } from "react-bootstrap";

export const PageError = () => (
    <div>
        <h1>ERROR 404</h1>

        <Image src="../images/404_face.jpg" responsive />

        <Image src="/app/images/404_face.jpg" responsive />

        <Image src="/images/404_face.jpg" responsive />
    </div>
);