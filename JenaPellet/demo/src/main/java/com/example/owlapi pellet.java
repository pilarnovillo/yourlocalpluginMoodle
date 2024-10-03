// package com.example;

// import org.apache.jena.ontology.OntDocumentManager;
// import org.apache.jena.ontology.OntModel;
// import org.apache.jena.ontology.OntModelSpec;
// import org.apache.jena.query.*;
// import org.apache.jena.rdf.model.ModelFactory;

// import org.semanticweb.owlapi.apibinding.OWLManager;
// import org.semanticweb.owlapi.model.OWLOntology;
// import org.semanticweb.owlapi.model.OWLOntologyManager;
// import org.semanticweb.owlapi.reasoner.OWLReasoner;
// import org.semanticweb.owlapi.reasoner.OWLReasonerFactory;
// import org.semanticweb.owlapi.util.InferredOntologyGenerator;
// import org.semanticweb.owlapi.util.SimpleIRIMapper;
// import org.springframework.web.bind.annotation.*;

// import com.clarkparsia.pellet.owlapiv3.PelletReasonerFactory;

// import org.semanticweb.owlapi.model.AxiomType;
// import org.semanticweb.owlapi.model.IRI;
// import org.semanticweb.owlapi.model.OWLAxiom;
// import org.semanticweb.owlapi.model.OWLDataFactory;

// import java.io.File;
// import java.io.FileOutputStream;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.List;




// @RestController
// @RequestMapping("/ontology")
// public class OntologyController {
//     private OWLOntology ontology;
//     private OWLOntologyManager manager;
//     private OntModel jenaModel;
//     private OWLOntology inferredOntology;

//     public OntologyController() throws Exception {
//         // Load the ontology using OWLAPI
//         manager = OWLManager.createOWLOntologyManager();

//         // 2024/3/
//         IRI ontoLOMIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoLOM");
//         // Map the IRI of the imported ontology to a local file path
//         File ontoLOM = new File("C:\\Users\\piluc\\Downloads\\OntoLOM.owl");
//         SimpleIRIMapper iriMapperOntoLOM = new SimpleIRIMapper(ontoLOMIRI, IRI.create(ontoLOM));
//         // Add the IRIMapper to the ontology manager
//         manager.getIRIMappers().add(iriMapperOntoLOM);


//         IRI ontoMETIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoMET");
//         // Map the IRI of the imported ontology to a local file path
//         File ontoMET = new File("C:\\Users\\piluc\\Downloads\\OntoMET.owl");
//         SimpleIRIMapper iriMapperOntoMET = new SimpleIRIMapper(ontoMETIRI, IRI.create(ontoMET));
//         // Add the IRIMapper to the ontology manager
//         manager.getIRIMappers().add(iriMapperOntoMET);


//         IRI ontoOAIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoOA");
//         // Map the IRI of the imported ontology to a local file path
//         File ontoOA = new File("C:\\Users\\piluc\\Downloads\\OntoOA-4.owl");
//         SimpleIRIMapper iriMapperOntoOA = new SimpleIRIMapper(ontoOAIRI, IRI.create(ontoOA));
//         // Add the IRIMapper to the ontology manager
//         manager.getIRIMappers().add(iriMapperOntoOA);


//         IRI ontoTIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT");
//         // Map the IRI of the imported ontology to a local file path
//         File ontoT = new File("C:\\Users\\piluc\\Downloads\\OntoT.owl");
//         SimpleIRIMapper iriMapperOntoT = new SimpleIRIMapper(ontoTIRI, IRI.create(ontoT));
//         // Add the IRIMapper to the ontology manager
//         manager.getIRIMappers().add(iriMapperOntoT);


//         ontology = manager.loadOntologyFromOntologyDocument(new File("C:\\Users\\piluc\\Downloads\\CONOCIMIENTO.owl"));

//         // Print the original IRI
//         System.out.println("Original Ontology IRI: " + ontology.getOntologyID().getOntologyIRI());

//         for (OWLOntology importedOntology : ontology.getImports()) {
//             System.out.println("Imported ontology: " + importedOntology.getOntologyID());
//         }


//         // // Change the ontology IRI
//         // IRI newIRI = IRI.create("file:///C:\\Users\\piluc\\Downloads\\CONOCIMIENTO.owl");
//         // Optional<IRI> newOntologyIRI = Optional.of(newIRI);
//         // Optional<IRI> versionIRI = ontology.getOntologyID().getVersionIRI();

//         // // Create a new ontology with the modified IRI using the Optional-based constructor
//         // OWLOntologyID newOntologyID = new OWLOntologyID(newOntologyIRI, versionIRI);

//         // // Create a new ontology with the modified IRI
//         // OWLOntology newOntology = manager.createOntology(newOntologyID);

//         // // Copy all axioms from the old ontology to the new ontology
//         // for (OWLAxiom axiom : ontology.getAxioms()) {
//         //         manager.addAxiom(newOntology, axiom);
//         //     }

//         // Create a Pellet reasoner
//         OWLReasonerFactory reasonerFactory = new PelletReasonerFactory();
//         OWLReasoner reasoner = reasonerFactory.createReasoner(ontology);
//         // reasoner.precomputeInferences();

//         // System.out.println("ANTES");
//         // if (!reasoner.isConsistent()) {
//         //     System.out.println("Ontology is inconsistent!");
//         // }

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET");

//         // Export inferred axioms to a new ontology or model
//         inferredOntology = manager.createOntology();

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET1");

//         // Get the data factory
//         OWLDataFactory dataFactory = manager.getOWLDataFactory();

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET3");

//         InferredOntologyGenerator generator = new InferredOntologyGenerator(reasoner);

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET4");
//         generator.fillOntology(dataFactory, inferredOntology);

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET5");


//         updateJenaModel();

//         // Clean up
//         // reasoner.dispose();
        
//     }

//     private void updateJenaModel() throws Exception {

        

//         // Save ontology to RDF/XML
//         // File rdfXmlFile = File.createTempFile("ontology", ".rdf");
//         // manager.saveOntology(ontology, new FileOutputStream(rdfXmlFile));

//         // // Load RDF/XML into Jena
//         // jenaModel = ModelFactory.createDefaultModel();
//         // jenaModel.read(rdfXmlFile.getAbsolutePath());


//         // Save ontology to RDF/XML
//         File rdfXmlFile = File.createTempFile("ontology", ".rdf");
//         manager.saveOntology(ontology, new FileOutputStream(rdfXmlFile));

//         // Use OntModelSpec.OWL_MEM_RDFS_INF to load the ontology with support for imports and reasoning
//         // jenaModel = ModelFactory.createOntologyModel(OntModelSpec.OWL_MEM_RDFS_INF);

//         OntDocumentManager mgr = new OntDocumentManager ();
//         // 2024/3/
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoLOM", "file:C:\\Users\\piluc\\Downloads\\OntoLOM.owl");
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoMET", "file:C:\\Users\\piluc\\Downloads\\OntoMET.owl");
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoT", "file:C:\\Users\\piluc\\Downloads\\OntoT.owl");
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoOA", "file:C:\\Users\\piluc\\Downloads\\OntoOA-4.owl");
        
//         OntModelSpec spec = new OntModelSpec ( OntModelSpec .OWL_DL_MEM_TRANS_INF);
//         spec.setDocumentManager(mgr);

//         jenaModel = ModelFactory.createOntologyModel(spec);

//         // // Create a LocationMapper to map the ontology IRI to a local file
//         // LocationMapper locationMapper = new LocationMapper();

//         // // Map the imported ontology IRI to the local file
//         // locationMapper.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoMET", "file:/C:/Users/piluc/Downloads/OntoMET.owl");
//         // locationMapper.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoT", "file:/C:/Users/piluc/Downloads/OntoT.owl");
//         // locationMapper.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoOA", "file:/C:/Users/piluc/Downloads/OntoOA-4-ontooa-y-ontot v01 ANDA eval y activ clasif x Nivel v02 ANDA alineacionRAOA PROBANDO alineacion OA.owl");
//         // locationMapper.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoLOM", "file:/C:/Users/piluc/Downloads/OntoLOM.owl");
        
//         // // Set the LocationMapper in the StreamManager
//         // StreamManager streamManager = StreamManager.get();
//         // streamManager.setLocationMapper(locationMapper);
//         // // Specify RDF/XML syntax (you can change this based on the format of your ontology)
//         // Lang rdfLang = Lang.RDFXML;  // If your ontology is in Turtle, use Lang.TTL

//         // // Load the main ontology using the StreamManager and RDF/XML syntax
//         // RDFDataMgr.read(jenaModel.getBaseModel(), streamManager.open(rdfXmlFile.getAbsolutePath()), null, rdfLang);

//         System.out.println("ALL GOOD WITH ONTOLOGY JENA");
        

//         // Load the main ontology
//         jenaModel.read(rdfXmlFile.getAbsolutePath());

//         // Ensure that all imports are loaded
//         jenaModel.loadImports();

//         // Optional: Print the imported models to verify
//         for (OntModel importedModel : jenaModel.listSubModels().toList()) {
//             System.out.println("Imported JENA ontology: " + importedModel.getNsPrefixURI(""));
//         }
//     }

//     @PostMapping("/addTriple")
//     public String addTriple(@RequestParam String subject, @RequestParam String predicate, @RequestParam String object) throws Exception {
//         // Add a triple to the ontology using OWLAPI (details omitted)
//         // Update the Jena model
//         updateJenaModel();
//         return "Triple added and ontology updated.";
//     }

//     @PostMapping("/sparqlQuery")
//     public Map<String, String> sparqlQuery(@RequestParam String queryStr) {
//         Query query = QueryFactory.create(queryStr);
//         try (QueryExecution qexec = QueryExecutionFactory.create(query, jenaModel)) {
//             System.out.println("Executing SPARQL Query");
//             ResultSet results = qexec.execSelect();
            
//             // Using a map to hold results with unique keys
//             Map<String, String> resultMap = new HashMap<>();
//             int index = 0; // Initialize an index to create unique keys
            
//             while (results.hasNext()) {
//                 QuerySolution soln = results.nextSolution();
//                 resultMap.put("result_" + index++, soln.toString()); // Use index to create unique keys
//             }
            
//             return resultMap;
//         }
//     }

//     @GetMapping("/getRules")
//     public String getSWRLRules() {
//         // List<String> swrlRules =  new ArrayList<>(); // No type arguments needed in constructor
//         // Vector<String> fruits = VectorFactory.vector();
//         // Retrieve SWRL rules from the ontology

//         // ontology.getRules();
//         for (OWLAxiom axiom : ontology.getAxioms(AxiomType.SWRL_RULE)) {
//         // Check if the axiom is a SWRL rule
//             // if (axiom instanceof SWRLRule) {
//                 // SWRLRule swrlRule = (SWRLRule) axiom; // Cast to SWRLRule
//                 // swrlRules.add(swrlRule.toString()); // Convert to string and add to the list
//                 System.out.println(axiom.toString()); // Print the SWRL rule
//                 return axiom.toString();
//             // }
//         }
        
        

//         return "NADA"; // Return the list of SWRL rules
//     }
// }

