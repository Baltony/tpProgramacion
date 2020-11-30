'use strict';

/*
 *	LOPEZ RUSSO, JULIAN
 */

let aProductos = [
	{
		id: 1,
		nombre: 'Nombre del producto 1',
		imagen: 'producto-de-ejemplo.jpg',
		descripcion: 'Descripción del producto 1',
		precio: 100,
	},
	{
		id: 2,
		nombre: 'Nombre del producto 2',
		imagen: 'producto-de-ejemplo.jpg',
		descripcion: 'Descripción del producto 2',
		precio: 200,
	},
	{
		id: 3,
		nombre: 'Nombre del producto 3',
		imagen: 'producto-de-ejemplo.jpg',
		descripcion: 'Descripción del producto 3',
		precio: 300,
	},
	{
		id: 4,
		nombre: 'Nombre del producto 4',
		imagen: 'producto-de-ejemplo.jpg',
		descripcion: 'Descripción del producto 4',
		precio: 400,
	},
	{
		id: 5,
		nombre: 'Nombre del producto 5',
		imagen: 'producto-de-ejemplo.jpg',
		descripcion: 'Descripción del producto 5',
		precio: 500,
	},
	{
		id: 6,
		nombre: 'Nombre del producto 6',
		imagen: 'producto-de-ejemplo.jpg',
		descripcion: 'Descripción del producto 6',
		precio: 600,
	},
];

const d = document;

//Tronco
let divPrincipal = d.querySelector('#productos');
let divCarrito = d.querySelector('#minicarrito');
let dolor = d.querySelector('#minicarrito p:nth-of-type(2) span');
let contador = d.querySelector('#minicarrito span');
let acumulador = 0;
let carrito = {
	items: [],
	cantidad: [],
	total: 0,
};

//En el 7mo dia juli creó la página
for (let producto of aProductos) {
	//Variables
	let div = d.createElement('div');
	let div2 = d.createElement('div');
	let img = d.createElement('img');
	let h3 = d.createElement('h3');
	let p = d.createElement('p');
	let span = d.createElement('span');
	let agregar = d.createElement('button');
	let quitar = d.createElement('button');
	let ampliar = d.createElement('button');
	//Maquetado
	divPrincipal.appendChild(div);
		//Imagen
	img.setAttribute('src', producto.imagen);
	img.setAttribute('alt', 'Foto del producto');
	div.appendChild(img);
	div.appendChild(div2);
		//h3
	h3.innerHTML = producto.nombre;
	div2.appendChild(h3);
		//p y span
	p.innerHTML = 'Precio: ';
	span.innerHTML = `$${producto.precio}`;
	div2.appendChild(p);
	p.appendChild(span);
		//botones
			//Agregar
	agregar.dataset.id = producto.id;
	agregar.dataset.precio = producto.precio;
	agregar.innerHTML = 'Agregar';
	div2.appendChild(agregar);
	agregar.onclick = function() {
		let id = parseInt(this.dataset.id);
		let val = parseInt(this.dataset.precio);
		let indice = carrito.items.indexOf(id);
		if (indice == -1) {
			carrito.items.push(id);
			carrito.cantidad.push(1);
			acumulador++;
		} else {
			carrito.cantidad[indice]++;
			acumulador++;
		}
		carrito.total = parseInt(carrito.total) + val;
		dolor.innerHTML = carrito.total;
		contador.innerHTML = acumulador;
	}
			//quitar
	quitar.dataset.id = producto.id;
	quitar.dataset.precio = producto.precio;
	quitar.innerHTML = 'Remover';
	div2.appendChild(quitar);
	quitar.onclick = function() {
		let id = parseInt(this.dataset.id);
		let val = parseInt(this.dataset.precio);
		let indice = carrito.items.indexOf(id);
		if (indice != -1) {
			if (carrito.cantidad[indice] > 0) {
				carrito.cantidad[indice]--;
				acumulador--;
				carrito.total = parseInt(carrito.total) - val;
			}
		}
		contador.innerHTML = acumulador;
		dolor.innerHTML = carrito.total;
	}
			//Ampliar
	ampliar.innerHTML = 'Ampliar';
	div2.appendChild(ampliar);
	ampliar.onclick = function() {
		let divModal = d.createElement('div');
		divModal.className = 'modal';
		//Cosas de adentro de la modal:
			//img
		let clone = img.cloneNode(true)
		d.body.appendChild(divModal);
		divModal.appendChild(clone);
			//Datos
		let pDesc = d.createElement('p');
		let pPrecio = d.createElement('p');
		pDesc.innerHTML = producto.descripcion;
		pPrecio.innerHTML = `Precio: $${producto.precio}`;
		divModal.appendChild(pDesc);
		divModal.appendChild(pPrecio);
		//Boton Cerrar:
		let a = d.createElement('a');
		a.href = '#';
		a.innerHTML = 'CERRAR';
		a.onclick = function () {
			d.querySelector('.modal').remove();
			return false;
		}
		divModal.appendChild(a);
	}
}

let verCarrito =d.querySelector('#minicarrito button');
verCarrito.onclick = function() {
	let div = d.createElement('div');
	let ul = d.createElement('ul');
	div.className = 'modal';
	ul.style.display = 'flex';
	ul.style.flexFlow = 'row';
	ul.style.justifyContent = 'center';
	d.body.appendChild(div);
	div.appendChild(ul);
	for (let i = 0; i < carrito.items.length; i++) {
		let productoId = carrito.items[i];
		let productoCantidad = carrito.cantidad[i];
		for (let item of aProductos) {
			if (productoId == item.id) {
				//Si no hago esto y remuevo un item me queda colgado con 0
				if (productoCantidad > 0){
					let liNombre = d.createElement('li');
					let liPrecio = d.createElement('li');
					let liCantidad = d.createElement('li');
					let liTotal = d.createElement('li');
					let divOrden = d.createElement('div');
					liTotal.style.fontWeight = '700';
					liNombre.innerHTML = item.nombre;
					liPrecio.innerHTML = `Precio individual: $${item.precio}`;
					liCantidad.innerHTML = `Cantidad: ${productoCantidad}`;
					liTotal.innerHTML = `Total: $${productoCantidad * item.precio}`;
					ul.appendChild(divOrden);
					divOrden.appendChild(liNombre);
					divOrden.appendChild(liPrecio);
					divOrden.appendChild(liCantidad);
					divOrden.appendChild(liTotal);
				}; 
				let a = d.createElement('a');
				a.href = '#';
				a.innerHTML = 'CERRAR';
				a.onclick = function () {
					d.querySelector('.modal').remove();
					return false;
				}
				div.appendChild(a);
			}
		}
	}
};