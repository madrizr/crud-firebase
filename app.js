var mostrar = document.getElementById('mostrar');
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB9aRl8V02N34ILt84kBiasyMc0MD6Xw9A",
  authDomain: "usuarios-8a3f4.firebaseapp.com",
  projectId: "usuarios-8a3f4"
});

var db = firebase.firestore();


function agregar_documentos(){
	var name = document.getElementById('name').value;
	var last = document.getElementById('last').value;
	var code = document.getElementById('code').value;
	var alerta = document.getElementById('alerta');
	console.log(name);
	//agregar documentos
db.collection("users").add({
    first: name,
    last: last,
    born: code
})
.then((docRef) => {
    console.log("Documento guardado con el ID: ", docRef.id);
    alerta.innerHTML = `<div class="alert  alert-success">
						<h4 class="text-white text-center">Datos enviados con exito</h4>
						</div>`
		setTimeout(() => {alerta.innerHTML="" }, 3000);

		document.getElementById('name').value = "";
		document.getElementById('last').value = "";
		document.getElementById('code').value = "";
})
.catch((error) => {
    console.error("Error al añadir el doc: ", error);
    alerta.innerHTML = `<div class="alert  alert-warning">
						<h4 class="text-white text-center">Oops! ocurrio un error</h4>
						</div>`
		setTimeout(() => {alerta.innerHTML="" }, 3000);
});
}

//Leer documentos
function leer_docs(mostrar){
	db.collection("users").onSnapshot((querySnapshot) => {
		mostrar.innerHTML = '';
	    querySnapshot.forEach((doc) => {
	        console.log(`${doc.id} => ${doc.data().first}`);
	        mostrar.innerHTML +=`<tr class="table-active">
					      <th scope="row">${doc.id}</th>
					      <td>${doc.data().first}</td>
					      <td>${doc.data().last}</td>
					      <td>${doc.data().born}</td>
					      <td><a  onclick="borrar('${doc.id}')"><i class="far fa-trash-alt text-danger"></i></a></td>
					      <td><a  onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')"><i class="fas fa-edit text-primary"></i></a></td>
				    	</tr>`
	    });
	});	
}leer_docs(mostrar);

//Borrar documento
function borrar(id){
	db.collection("users").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
	}).catch((error) => {
	    console.error("Error removing document: ", error);
	});
}

//editar datos
function editar(id, name, last, code){

	document.getElementById('name').value = name;
	document.getElementById('last').value = last;
	document.getElementById('code').value = code;
	var btn_guardar = document.getElementById('save');
	btn_guardar.innerHTML = 'Editar dato';

	btn_guardar.onclick = () => {
		var washingtonRef = db.collection("users").doc(id);

		// Set the "capital" field of the city 'DC'

		var name = document.getElementById('name').value;
		var last = document.getElementById('last').value;
		var code = document.getElementById('code').value;

		return washingtonRef.update({
		    first: name,
		    last: last,
		    born: code
		})
		.then(() => {

			alerta.innerHTML = `<div class="alert  alert-success">
								<h4 class="text-white text-center">Dato actualizado con exito</h4>
								</div>`
			setTimeout(() => {alerta.innerHTML="" }, 3000);

		    console.log("Document successfully updated!");
		    document.getElementById('name').value = "";
			document.getElementById('last').value = "";
			document.getElementById('code').value = "";
			btn_guardar.innerHTML = 'Enviar datos';
		})
		.catch((error) => {
		    // The document probably doesn't exist.
		    console.error("Error updating document: ", error);

		     alerta.innerHTML = `<div class="alert  alert-warning">
						<h4 class="text-white text-center">Oops! ocurrio un error</h4>
						</div>`
			setTimeout(() => {alerta.innerHTML="" }, 3000);
		});
		}
}




