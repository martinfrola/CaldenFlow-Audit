export function getTimestamp(dateString) {
  // Dividir la fecha y la hora
  const [datePart, timePart] = dateString.split(' ');

  // Extraer día, mes y año
  const [day, month, yearPart] = datePart.split('/');
  const year = '20' + yearPart; // Asumiendo que 'yy' es 2000 + yy

  // Extraer hora, minuto y segundo
  const [hour, minute, second] = timePart.split(':');

  // Crear objeto de fecha
  const date = new Date(year, month - 1, day, hour, minute, second);

  // Retornar timestamp en milisegundos
  return date.getTime();
}