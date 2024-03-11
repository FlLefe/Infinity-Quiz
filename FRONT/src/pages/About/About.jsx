import React from 'react';
import { Link } from 'react-router-dom';
import "./About.scss";


export default function About (){
    return (
    <div className='aboutContainer'>
        <p>Bienvenue dans le futur des quiz</p>

        <p>Imaginez un monde où l'apprentissage est aussi captivant qu'un jeu, où chaque quiz est une aventure, et chaque réponse est une victoire. Dans ce monde, l'ingéniosité des étudiants se mêle à la puissance de l'IA pour créer des quiz aussi accrocheurs que pertinents.</p>

        <p className='citation'>' L'imagination est plus importante que le savoir. ' 
        <br/><br/> Albert Einstein</p>

        <p> Et c'est précisément cette imagination qui guide les try harders en provenance <Link to="https://oclock.io/">d'O'Clock</Link> dans leur quête pour révolutionner l'éducation et le divertissement.</p>
    </div>
    )
}