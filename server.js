const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const amenagementRoutes = require('./routes/amenagementRoutes');
const batimentAdminRoutes = require('./routes/batimentAdminRoutes');
const besoinsEtabScoRoutes = require('./routes/besoinsEtabScoRoutes');
const consignesRoutes = require('./routes/consignesRoutes');
const constructionRoutes = require('./routes/constructionRoutes');
const depouillementRoutes = require('./routes/depouillementRoutes');
const dortoirRoutes = require('./routes/dortoirRoutes');
const enterpriseRoutes = require('./routes/enterpriseRoutes');
const etablissementScolaireRoutes = require('./routes/etablissementScolaireRoutes');
const etudesRoutes = require('./routes/etudesRoutes');
const infrastructureRoutes = require('./routes/infrastructureRoutes');
const loginRoutes = require('./routes/loginRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const membreEquipeRoutes = require('./routes/membreEquipeRoutes');
const membreProjetRoutes = require('./routes/membreProjetRoutes');
const problemRoutes = require('./routes/problemeRoutes');
const projectRoutes = require('./routes/projectRoutes');
const reglementDefinRoutes = require('./routes/reglementDefinRoutes');
const resourcesRoutes = require('./routes/resourcesRoutes');
const responsableProjetRoutes = require('./routes/responsableProjetRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const roleRoutes = require('./routes/roleRoutes');
const suiviRoutes = require('./routes/suiviRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_crm'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL server connected');
});

// Routes
app.use('/amenagement', amenagementRoutes);
app.use('/batiment_admin', batimentAdminRoutes);
app.use('/besoins_etab_sco', besoinsEtabScoRoutes);
app.use('/consignes', consignesRoutes);
app.use('/construction', constructionRoutes);
app.use('/depouillement', depouillementRoutes);
app.use('/dortoir', dortoirRoutes);
app.use('/entreprise_cons', enterpriseRoutes);
app.use('/etablissement_scolaire', etablissementScolaireRoutes);
app.use('/etudes', etudesRoutes);
app.use('/infrastructures', infrastructureRoutes);
app.use('/login', loginRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/membre_equipe', membreEquipeRoutes);
app.use('/membre_projet', membreProjetRoutes);
app.use('/probleme', problemRoutes);
app.use('/projet', projectRoutes);
app.use('/reglement_defin', reglementDefinRoutes);
app.use('/ressources', resourcesRoutes);
app.use('/responsable_projet', responsableProjetRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/roles', roleRoutes);
app.use('/suivi', suiviRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

