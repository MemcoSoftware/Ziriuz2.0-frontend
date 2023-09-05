export type User = {
    _id: string;
    number: number;
    username: string;
    password: string;
    name: string;
    cedula: number;
    telefono: string;
    email: string;
    more_info: string;
    roles: Array<{ _id: string; name: string }>; // Agregar el campo roles con su estructura
  };
  