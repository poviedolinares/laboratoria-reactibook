import * as firebase from "firebase";
import { FirebaseConfig } from "./claves";

firebase.initializeApp(FirebaseConfig);

const punteroBD = firebase.database().ref();

export const punteroPublicacionesBD = punteroBD.child("publicaciones");
export const punteroAmigosBD = punteroBD.child("amigos");

export const punteroAutenticacionFirebase = firebase.auth();