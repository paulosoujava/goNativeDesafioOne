const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


function validateRepositorieIds(request, response, next){
  const { id } = request.params;
  if( !isUuid(id)){
    return reposponse.status(400).json({ error: 'Invalide repositorie ID'})
  }
  return next();
}

app.get("/repositories", (request, response) => {
  const { title } = request.query;
  const results = title ? repositories.filter( 
    rep => rep.title.includes(title))
    : repositories;
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs, like} = request.body;
  const repositorie = {id: uuid(), title, url, techs, like };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs } = request.body;
  
  const repIdx = repositories.findIndex(
    rep => rep.id === id
    );
    if( repIdx < 0 ){
      return response.status(400).json({error: 'Repositorie not found'})
    }
    const like =  repositories[repIdx]['like'];
    const repo = {
      id,
      title,
      url,
      techs,
      like
    };
    
    repositories[repIdx] = repo;
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repIdx = repositories.findIndex(
    rep => rep.id === id
    );
    if( repIdx < 0 ){
      return response.status(400).json({error: 'Repositorie not found'})
    }
    repositories.splice(repIdx,1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repIdx = repositories.findIndex(
    rep => rep.id === id
    );
    if( repIdx < 0 ){
      return response.status(400).json({error: 'Repositorie not found'})
    }
    
    repositories[repIdx]['like'] = repositories[repIdx]['like'] + 1;
    
  return response.json(repositories[repIdx]['like']);
});

app.listen(3334, ()=>{
  console.log('🙏 Back-end started!')
});

module.exports = app;
