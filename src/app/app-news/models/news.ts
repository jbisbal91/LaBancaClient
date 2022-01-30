
export class News {
    Id: number = null;
    content: string = '';
    created_at: string = '';
    documentos:boolean = false;
    fecha: string = '';
    imagen_content: string = '';
    imagen_titulo: string = '';
    order_view:number = 0;
    subtitulo: string = '';
    titulo: string = '';
    updated_at = new Date();

    constructor(
        Id: number,
        content: string,
        created_at: string,
        documentos: boolean,
        fecha: string,
        imagen_content: string,
        imagen_titulo: string,
        order_view: number,
        subtitulo: string,
        titulo: string,
        updated_at: Date
      ) {
        this.Id = Id;
        this.content = content;
        this.created_at = created_at;
        this.documentos = documentos;
        this.fecha = fecha;
        this.imagen_content = imagen_content;
        this.imagen_titulo = imagen_titulo;
        this.order_view = order_view;
        this.subtitulo = subtitulo;
        this.titulo = titulo;
        this.updated_at = updated_at;
      }
  }
  
