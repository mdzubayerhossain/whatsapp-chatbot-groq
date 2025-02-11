import express from 'express';
import bodyParser from 'body-parser';
import { KnowledgeBaseController } from './controllers/knowledge-base.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const knowledgeBaseController = new KnowledgeBaseController();

app.get('/knowledge-base', knowledgeBaseController.getKnowledgeBase.bind(knowledgeBaseController));
app.post('/query', knowledgeBaseController.postQuery.bind(knowledgeBaseController));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});