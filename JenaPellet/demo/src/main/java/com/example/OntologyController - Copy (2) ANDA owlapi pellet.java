// package com.example;

// import org.apache.jena.ontology.OntDocumentManager;
// import org.apache.jena.ontology.OntModel;
// import org.apache.jena.ontology.OntModelSpec;
// import org.apache.jena.query.*;
// import org.apache.jena.rdf.model.ModelFactory;

// import org.semanticweb.owlapi.apibinding.OWLManager;
// import org.semanticweb.owlapi.model.OWLOntology;
// import org.semanticweb.owlapi.model.OWLOntologyManager;
// import org.semanticweb.owlapi.model.PrefixManager;
// import org.semanticweb.owlapi.reasoner.InferenceType;
// import org.semanticweb.owlapi.reasoner.OWLReasoner;
// import org.semanticweb.owlapi.reasoner.OWLReasonerFactory;
// import org.semanticweb.owlapi.util.DefaultPrefixManager;
// import org.semanticweb.owlapi.util.InferredOntologyGenerator;
// import org.semanticweb.owlapi.util.SimpleIRIMapper;
// import org.springframework.web.bind.annotation.*;

// import com.clarkparsia.pellet.owlapiv3.PelletReasonerFactory;
// import com.google.common.base.Stopwatch;

// import org.semanticweb.owlapi.model.AxiomType;
// import org.semanticweb.owlapi.model.EntityType;
// import org.semanticweb.owlapi.model.IRI;
// import org.semanticweb.owlapi.model.OWLAxiom;
// import org.semanticweb.owlapi.model.OWLClass;
// import org.semanticweb.owlapi.model.OWLClassAssertionAxiom;
// import org.semanticweb.owlapi.model.OWLDataFactory;
// import org.semanticweb.owlapi.model.OWLDataProperty;
// import org.semanticweb.owlapi.model.OWLDataPropertyAssertionAxiom;
// import org.semanticweb.owlapi.model.OWLEntity;
// import org.semanticweb.owlapi.model.OWLLiteral;
// import org.semanticweb.owlapi.model.OWLNamedIndividual;
// import org.semanticweb.owlapi.model.OWLObjectProperty;
// import org.semanticweb.owlapi.model.OWLObjectPropertyAssertionAxiom;

// import java.io.File;
// import java.io.FileOutputStream;
// import java.util.HashMap;
// import java.util.Map;
// import java.util.concurrent.TimeUnit;
// import java.util.List;






// @RestController
// @RequestMapping("/ontology")
// public class OntologyController {
//     private OWLOntology ontology;
//     private OWLOntologyManager manager;
//     private OntModel jenaModel;
//     private OWLOntology inferredOntology;
//     private OWLReasoner reasoner;
//     private OWLDataFactory dataFactory;
//     private PrefixManager pm;
//     private String baseIRI ="http://www.semanticweb.org/valer/ontologies/OntoOA";
//     InferredOntologyGenerator generator;

//     public OntologyController() {
        
        
//     }

//     @GetMapping("/startService")
//     public String startService(@RequestParam String oaid) throws Exception{
//         // Procesa los parámetros recibidos

//         // Load the ontology using OWLAPI
//         manager = OWLManager.createOWLOntologyManager();

//         // 2024/3/
//         IRI ontoLOMIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/2024/3/OntoLOM");
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
//         File ontoOA = new File("C:\\Users\\piluc\\Downloads\\BASE 2 OntoOA y OntoT en construcción.owl");
//         SimpleIRIMapper iriMapperOntoOA = new SimpleIRIMapper(ontoOAIRI, IRI.create(ontoOA));
//         // Add the IRIMapper to the ontology manager
//         manager.getIRIMappers().add(iriMapperOntoOA);


//         IRI ontoTIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT");
//         // Map the IRI of the imported ontology to a local file path
//         File ontoT = new File("C:\\Users\\piluc\\Downloads\\OntoT.owl");
//         SimpleIRIMapper iriMapperOntoT = new SimpleIRIMapper(ontoTIRI, IRI.create(ontoT));
//         // Add the IRIMapper to the ontology manager
//         manager.getIRIMappers().add(iriMapperOntoT);

//         ontology = manager.loadOntologyFromOntologyDocument(new File("C:\\Users\\piluc\\Downloads\\BASE 2 OntoOA y OntoT en construcción.owl"));

//         // Print the original IRI
//         System.out.println("Original Ontology IRI: " + ontology.getOntologyID().getOntologyIRI());

//         for (OWLOntology importedOntology : ontology.getImports()) {
//             System.out.println("Imported ontology: " + importedOntology.getOntologyID());
//         }

        

//         Stopwatch stopwatch = Stopwatch.createStarted();
//         // Create a Pellet reasoner
//         OWLReasonerFactory reasonerFactory = new PelletReasonerFactory();
//         reasoner = reasonerFactory.createReasoner(ontology);
//         reasoner.precomputeInferences(InferenceType.CLASS_HIERARCHY,
//                                InferenceType.OBJECT_PROPERTY_HIERARCHY,
//                                 InferenceType.DATA_PROPERTY_HIERARCHY,
//                                 InferenceType.CLASS_ASSERTIONS,
//                                  InferenceType.OBJECT_PROPERTY_ASSERTIONS,
//                                   InferenceType.SAME_INDIVIDUAL);
                               
//         System.out.println("Ontologies processed in {} ms by {}"+ stopwatch.elapsed(TimeUnit.MILLISECONDS) + reasoner.getReasonerName());
//         System.out.println("ANTES");
//         if (!reasoner.isConsistent()) {
//             System.out.println("Ontology is inconsistent!");
//         }

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET");

//         // Export inferred axioms to a new ontology or model
//         inferredOntology = manager.createOntology();

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET1");

//         // Get the data factory
//         dataFactory = manager.getOWLDataFactory();

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET3");

//         generator = new InferredOntologyGenerator(reasoner);

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET4");
//         generator.fillOntology(dataFactory, inferredOntology);

//         System.out.println("ALL GOOD WITH ONTOLOGY PELLET5");

//         pm = new DefaultPrefixManager(null, null, "http://www.semanticweb.org/valer/ontologies/OntoOA#"); // Adjust the base IRI to match your ontology

//         updateJenaModel();

        

//         // ontology = inferredOntology;

//         // Clean up
//         // reasoner.dispose();
//         return "Se recibieron los parámetros: " + oaid;
//     }

//     private void updateJenaModel() throws Exception {
        

//         // Save ontology to RDF/XML
//         File rdfXmlFile = File.createTempFile("ontology", ".rdf");
//         manager.saveOntology(inferredOntology, new FileOutputStream(rdfXmlFile));

//         OntDocumentManager mgr = new OntDocumentManager ();
//         // 2024/3/
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/2024/3/OntoLOM", "file:C:\\Users\\piluc\\Downloads\\OntoLOM.owl");
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoMET", "file:C:\\Users\\piluc\\Downloads\\OntoMET.owl");
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoT", "file:C:\\Users\\piluc\\Downloads\\OntoT.owl");
//         mgr.addAltEntry("http://www.semanticweb.org/valer/ontologies/OntoOA", "file:C:\\Users\\piluc\\Downloads\\BASE 2 OntoOA y OntoT en construcción.owl");
        
//         OntModelSpec spec = new OntModelSpec ( OntModelSpec .OWL_DL_MEM_TRANS_INF);
//         spec.setDocumentManager(mgr);

//         jenaModel = ModelFactory.createOntologyModel(spec);

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

//     public void updateOntology(OWLOntology ontology, OWLAxiom axiom) {
//         ontology.getOWLOntologyManager().addAxiom(ontology, axiom);
//         reasoner.flush();  // Sincroniza los cambios
//         reasoner.precomputeInferences(InferenceType.CLASS_HIERARCHY,
//                                InferenceType.OBJECT_PROPERTY_HIERARCHY,
//                                 InferenceType.DATA_PROPERTY_HIERARCHY,
//                                 InferenceType.CLASS_ASSERTIONS,
//                                  InferenceType.OBJECT_PROPERTY_ASSERTIONS,
//                                   InferenceType.SAME_INDIVIDUAL);
//     }

    
//     @PostMapping("/addTriple")
//     public String addTriple(@RequestParam String subject, @RequestParam String predicate, @RequestParam String object) throws Exception {
//         // Add a triple to the ontology using OWLAPI (details omitted)
//         // Update the Jena model
//         // updateOntology()
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

//     // Method to insert an axiom into the ontology
//     @PostMapping("/insertAxiom")
//     public String insertAxiom(@RequestParam String individualName, 
//                               @RequestParam String propertyName, 
//                               @RequestParam String target) {
//         try {
//             // Create an individual
//             OWLNamedIndividual individual = dataFactory.getOWLNamedIndividual(":" + individualName, pm);

//             // Check if the property is a data property or object property
//             OWLEntity property = dataFactory.getOWLEntity(EntityType.OBJECT_PROPERTY, IRI.create(pm.getDefaultPrefix() + propertyName));
            
//             if (property.isOWLObjectProperty()) {
//                 // It's an object property (relationship between individuals)
//                 OWLObjectProperty objectProperty = property.asOWLObjectProperty();
//                 OWLNamedIndividual targetIndividual = dataFactory.getOWLNamedIndividual(":" + target, pm);

//                 // Create an object property assertion axiom (individual -> property -> targetIndividual)
//                 OWLObjectPropertyAssertionAxiom axiom = dataFactory.getOWLObjectPropertyAssertionAxiom(objectProperty, individual, targetIndividual);

//                 // Add the axiom to the ontology
//                 manager.addAxiom(ontology, axiom);
                
//             } else if (property.isOWLDataProperty()) {
//                 // It's a data property (relationship between individual and data value)
//                 OWLDataProperty dataProperty = property.asOWLDataProperty();

//                 // Assuming the target is a literal value (e.g., a string or number)
//                 OWLLiteral literal = dataFactory.getOWLLiteral(target);

//                 // Create a data property assertion axiom (individual -> property -> literal)
//                 OWLDataPropertyAssertionAxiom axiom = dataFactory.getOWLDataPropertyAssertionAxiom(dataProperty, individual, literal);

//                 // Add the axiom to the ontology
//                 manager.addAxiom(ontology, axiom);
//             } else {
//                 return "Property type is not recognized.";
//             }

//             // Save the ontology after adding the axiom
//             manager.saveOntology(ontology);

//             return "Axiom successfully added to the ontology.";

//         } catch (Exception e) {
//             e.printStackTrace();
//             return "Error while inserting axiom: " + e.getMessage();
//         }
//     }

//     @PostMapping("/insertIndividual")
//     public String insertIndividual(@RequestParam String individualName, @RequestParam String className) {
//         try {
//             //TODO implementar ver si ya esxiste el individuo para no hacer sincronizar.
//             // Get OWL Data Factory and Ontology Manager
//             OWLOntologyManager manager = ontology.getOWLOntologyManager();
//             OWLDataFactory factory = manager.getOWLDataFactory();

//             // Create the individual and the class
//             OWLNamedIndividual individual = factory.getOWLNamedIndividual(IRI.create(baseIRI + "#" + individualName));
//             OWLClass owlClass = factory.getOWLClass(IRI.create(baseIRI + "#" + className));

//             // Create a Class Assertion Axiom (individual is an instance of the class)
//             OWLClassAssertionAxiom classAssertion = factory.getOWLClassAssertionAxiom(owlClass, individual);

//             // Apply the change (Add the Axiom to the Ontology)
//             manager.addAxiom(ontology, classAssertion);

//             // Save ontology after modification if necessary
//             manager.saveOntology(ontology);

//             synchronizeReasoner();

//             return "Individual '" + individualName + "' added to class '" + className + "' successfully.";
//         } catch (Exception e) {
//             e.printStackTrace();
//             return "Failed to insert individual '" + individualName + "' to class '" + className + "'. Error: " + e.getMessage();
//         }
//     }

    

//     private void synchronizeReasoner() throws Exception {
//         System.out.println("synchronizeReasoner");
//         reasoner.flush();  // Sincroniza los cambios
//         System.out.println("synchronizeReasoner: end flush");
//         reasoner.precomputeInferences(InferenceType.CLASS_ASSERTIONS);

//         System.out.println("synchronizeReasoner: finished Precopute");
//         //  
//         inferredOntology = manager.createOntology();
//         generator = new InferredOntologyGenerator(reasoner);
//         generator.fillOntology(dataFactory, inferredOntology);
//         System.out.println("synchronizeReasoner:fillontology");

//         updateJenaModel();

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

