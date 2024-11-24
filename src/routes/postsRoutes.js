import express from "express"; // Importa o framework Express para criar o servidor
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";// Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos usando Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados (uploads/)
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo como o nome original do arquivo carregado
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas para lidar com diferentes requisições HTTP
const routes = (app) => {
  // Permite que o servidor interprete requisições com formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (chama a função controladora listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (chama a função controladora postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para fazer upload de uma imagem (usa o middleware upload.single e chama a função controladora uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes; // Exporta a função de rotas para ser usada no arquivo principal da aplicação