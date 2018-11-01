const firebase = require('firebase');
require('firebase/firestore');


export class Firebase{

constructor(){

    this._initialized = false;
	this._config = {
    apiKey: "AIzaSyB3ntlXD_5pnhAY0lx1GVec8KhSixAYgo4",
    authDomain: "whatsapp-clone-430d4.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-430d4.firebaseio.com",
    projectId: "whatsapp-clone-430d4",
    storageBucket: "gs://whatsapp-clone-430d4.appspot.com",
    messagingSenderId: "798983930236"
  };
 
	this.init();
}


init(){
	if(!window._initializedFirebase){
		firebase.initializeApp(this._config);
       //fica constatemente de olho nas
		firebase.firestore().settings({
           timestampsInSnapshots:true
		});

		window._initializedFirebase = true;
	}

}//init

static db(){
return firebase.firestore();
}//db

static hd(){
return firebase.storage();
}//hd


initAuth(){
	return new Promise((s,f) =>{
		let provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider)
		.then(result=>{
			let token = result.credential.accessToken;
			let user = result.user;

			s({
			 user, 
			 token	
			});
		})
		.catch(err =>{
			f(err);
		});
	});
}//initAuth

}