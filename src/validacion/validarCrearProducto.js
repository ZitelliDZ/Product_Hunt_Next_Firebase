export default function validarCrearProducto(valores) {

    let errores = {}

    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio!.'
    }

    // validar la empresa
    if (!valores.empresa) {
        errores.empresa = "Nombre de empresa es obligatorio!.";
    } 
    
    // validar la url
    if (!valores.url) {
        errores.url = "La URL es obligatorio!.";
    }else if(!/^(ftp|http|https):\/\/[^"]+$/.test(valores.url)){
        errores.url = "URL mal formateada o no válida!.";
    }

    // validar la descripcion
    if (!valores.descripcion) {
        errores.descripcion = 'Agrega una descripción de tu producto!.'
    }

    return errores;
}