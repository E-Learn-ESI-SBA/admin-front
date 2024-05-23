import { Container } from 'inversify';
import 'reflect-metadata';
import {AbstractFirebase,Firebase} from "@/lib/firebase";



const firebaseService = new Container();

if (typeof window !== 'undefined') {
    firebaseService.bind<AbstractFirebase>(AbstractFirebase.name).to(Firebase);
}

export default firebaseService;
