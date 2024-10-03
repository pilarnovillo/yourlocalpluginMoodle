package com.example;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.PrefixManager;
import org.semanticweb.owlapi.model.RemoveAxiom;
import org.semanticweb.owlapi.reasoner.InferenceType;
import org.semanticweb.owlapi.reasoner.Node;
import org.semanticweb.owlapi.reasoner.NodeSet;
import org.semanticweb.owlapi.reasoner.OWLReasoner;
import org.semanticweb.owlapi.reasoner.OWLReasonerFactory;
import org.semanticweb.owlapi.util.DefaultPrefixManager;
import org.semanticweb.owlapi.util.SimpleIRIMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.clarkparsia.pellet.owlapiv3.PelletReasonerFactory;
import com.google.common.base.Stopwatch;

import org.semanticweb.owlapi.model.EntityType;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAxiom;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLClassAssertionAxiom;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDataProperty;
import org.semanticweb.owlapi.model.OWLDataPropertyAssertionAxiom;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLIndividual;
import org.semanticweb.owlapi.model.OWLLiteral;
import org.semanticweb.owlapi.model.OWLNamedIndividual;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLObjectPropertyAssertionAxiom;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;
import java.util.List;






@RestController
@RequestMapping("/ontology")
public class OntologyController {
    private static final String baseOntoU = "http://www.semanticweb.org/valer/ontologies/OntoU#";
    private OWLOntology ontologyConocimiento;
    private OWLOntology ontologyOntoU;
    private OWLOntologyManager manager;
    private OWLReasoner reasonerOntoU;
    private OWLReasoner reasonerConocimiento;
    private OWLDataFactory dataFactory;
    private PrefixManager pm;
    private String baseIRI ="http://www.semanticweb.org/valer/ontologies/OntoOA#";

    private String oaid = "";
    
    public OntologyController() {
        
        
    }

    @GetMapping("/startService")
    public String startService(@RequestParam String oaidParam) throws Exception{
        // Procesa los parámetros recibidos
        oaid = oaidParam;

        String originalConocimientoFilePath = "C:\\Users\\piluc\\Downloads\\CAPA_CONOCIMIENTO.owl";
        String copyConocimientoFilePath= "C:\\Users\\piluc\\Downloads\\ontologiasOA\\CAPA_CONOCIMIENTO_" + oaid + ".owl";


        //Instanciar nuevo archivo de la ontologia para el oaid
        File copyFile = new File(copyConocimientoFilePath);

        // Si el archivo no existe, crea una copia
        if (!copyFile.exists()) {
            Files.copy(Path.of(originalConocimientoFilePath), Path.of(copyConocimientoFilePath), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Copia realizada: " + copyConocimientoFilePath);
        } else {
            System.out.println("El archivo ya existe: " + copyConocimientoFilePath);
     
        }

        
        // Load the ontology using OWLAPI
        manager = OWLManager.createOWLOntologyManager();

        // 2024/3/
        IRI ontoLOMIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoLOM");
        // Map the IRI of the imported ontology to a local file path
        File ontoLOM = new File("C:\\Users\\piluc\\Downloads\\OntoLOM.owl");
        SimpleIRIMapper iriMapperOntoLOM = new SimpleIRIMapper(ontoLOMIRI, IRI.create(ontoLOM));
        // Add the IRIMapper to the ontology manager
        manager.getIRIMappers().add(iriMapperOntoLOM);


        IRI ontoMETIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoMET");
        // Map the IRI of the imported ontology to a local file path
        File ontoMET = new File("C:\\Users\\piluc\\Downloads\\OntoMET.owl");
        SimpleIRIMapper iriMapperOntoMET = new SimpleIRIMapper(ontoMETIRI, IRI.create(ontoMET));
        // Add the IRIMapper to the ontology manager
        manager.getIRIMappers().add(iriMapperOntoMET);


        IRI ontoOAIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoOA");
        // Map the IRI of the imported ontology to a local file path
        File ontoOA = new File("C:\\Users\\piluc\\Downloads\\OntoOA vacia.owl");
        SimpleIRIMapper iriMapperOntoOA = new SimpleIRIMapper(ontoOAIRI, IRI.create(ontoOA));
        // Add the IRIMapper to the ontology manager
        manager.getIRIMappers().add(iriMapperOntoOA);


        IRI ontoTIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT");
        // Map the IRI of the imported ontology to a local file path
        File ontoT = new File("C:\\Users\\piluc\\Downloads\\OntoT.owl");
        SimpleIRIMapper iriMapperOntoT = new SimpleIRIMapper(ontoTIRI, IRI.create(ontoT));
        // Add the IRIMapper to the ontology manager
        manager.getIRIMappers().add(iriMapperOntoT);
                                                                        // BASE 2 OntoOA y OntoT en construcción.
        ontologyConocimiento = manager.loadOntologyFromOntologyDocument(new File(copyConocimientoFilePath));

        ontologyOntoU = manager.loadOntologyFromOntologyDocument(new File("C:\\Users\\piluc\\Downloads\\OntoU.owl"));

        // Print the original IRI
        System.out.println("Original Ontology IRI: " + ontologyConocimiento.getOntologyID().getOntologyIRI());

        for (OWLOntology importedOntology : ontologyConocimiento.getImports()) {
            System.out.println("Imported ontology: " + importedOntology.getOntologyID());
        }


        return "Se recibieron los parámetros: " + oaid;
    }

    @GetMapping("/razonar")
    public String razonar(@RequestParam String ontologia) throws Exception {
        Stopwatch stopwatch = Stopwatch.createStarted();
        // Create a Pellet reasoner
        OWLReasonerFactory reasonerFactory = new PelletReasonerFactory();

        if(ontologia.equals("CONOCIMIENTO")){
            reasonerConocimiento = reasonerFactory.createReasoner(ontologyConocimiento);

            reasonerConocimiento.precomputeInferences(InferenceType.CLASS_HIERARCHY,
                               InferenceType.OBJECT_PROPERTY_HIERARCHY,
                                InferenceType.DATA_PROPERTY_HIERARCHY,
                                InferenceType.CLASS_ASSERTIONS,
                                 InferenceType.OBJECT_PROPERTY_ASSERTIONS,
                                  InferenceType.SAME_INDIVIDUAL);
                               
            System.out.println("Ontologies processed in {} ms by {}"+ stopwatch.elapsed(TimeUnit.MILLISECONDS) + reasonerConocimiento.getReasonerName());
            
            if (!reasonerConocimiento.isConsistent()) {
                System.out.println("Ontology is inconsistent!");
            }

        }
        else{
            reasonerOntoU = reasonerFactory.createReasoner(ontologyOntoU);

            reasonerOntoU.precomputeInferences(InferenceType.CLASS_HIERARCHY,
                               InferenceType.OBJECT_PROPERTY_HIERARCHY,
                                InferenceType.DATA_PROPERTY_HIERARCHY,
                                InferenceType.CLASS_ASSERTIONS,
                                 InferenceType.OBJECT_PROPERTY_ASSERTIONS,
                                  InferenceType.SAME_INDIVIDUAL);
                               
            System.out.println("Ontologies processed in {} ms by {}"+ stopwatch.elapsed(TimeUnit.MILLISECONDS) + reasonerOntoU.getReasonerName());
            
            if (!reasonerOntoU.isConsistent()) {
                System.out.println("Ontology is inconsistent!");
            }
        }

        pm = new DefaultPrefixManager(null, null, "http://www.semanticweb.org/valer/ontologies/OntoOA#"); // Adjust the base IRI to match your ontology

        return "Razonamiento existoso";
    }


    // Método para obtener los individuos de una clase
    @GetMapping("/individuals")
    public List<String> getIndividuals(@RequestParam String className, @RequestParam(defaultValue = "false") boolean onlyExplicit) throws Exception {
        List<String> individualsList = new ArrayList<>();
        OWLDataFactory dataFactory = ontologyConocimiento.getOWLOntologyManager().getOWLDataFactory();
        
        // Buscar la clase OWL por nombre
        OWLClass owlClass = dataFactory.getOWLClass(IRI.create( baseIRI + className));
        
        // Obtener los individuos de la clase (inferidos o explícitos)
        NodeSet<OWLNamedIndividual> individualsNodeSet = reasonerConocimiento.getInstances(owlClass, onlyExplicit);
        
        // Recorrer los nodos e individuos
        for (Node<OWLNamedIndividual> node : individualsNodeSet) {
            for (OWLNamedIndividual individual : node.getEntities()) {
                individualsList.add(individual.getIRI().getShortForm());
            }
        }
        
        return individualsList;
    }

    @GetMapping("/getOATopics")
    public List<String> getOATopics(@RequestParam String oaid) {
        // SELECT * WHERE { 
        //     ?oa a oaca:OA.
        //     FILTER(?oa = oaca:OA$oaid)
        //     ?oa  oaca:oaTieneComponente  ?contenido .
        //     ?contenido oaca:contenidoDesarrollaTopico ?topic.
        // }
        List<String> topicosDeOA = new ArrayList<>();
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLClass oaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "OA"));

        for (OWLNamedIndividual oaIndividual : reasonerConocimiento.getInstances(oaClass, false).getFlattened()) {
            if (oaIndividual.getIRI().getShortForm().equals(oaid)) {
                OWLObjectProperty oaTieneComponente = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "oaTieneComponente"));
                for (OWLNamedIndividual contenido : reasonerConocimiento.getObjectPropertyValues(oaIndividual, oaTieneComponente).getFlattened()) {
                    OWLObjectProperty contenidoDesarrollaTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "contenidoDeInstruccionDesarrollaTopico"));
                    for (OWLNamedIndividual topico : reasonerConocimiento.getObjectPropertyValues(contenido, contenidoDesarrollaTopico).getFlattened()) {
                       topicosDeOA.add(topico.getIRI().getShortForm());
                    }
                }

            }
        }
        return topicosDeOA;

    }

    @GetMapping("/getOARAAsignatura")
    public List<String> getOARAAsignatura(@RequestParam String oaid) {
        // SELECT * WHERE { 
        //     ?oa a oaca:OA.
        //     FILTER(?oa = oaca:OA$id)
        //     ?oa  oaca:oaTieneComponente  ?ra .
        //     ?ra a oaca:ResultadoAprendizajeOA.
        //     ?ra oaca:raOARefinaRAAsignatura ?raasig.
        // }
        List<String> raasigDeOA = new ArrayList<>();
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLClass oaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "OA"));

        for (OWLNamedIndividual oaIndividual : reasonerOntoU.getInstances(oaClass, false).getFlattened()) {
            if (oaIndividual.getIRI().getShortForm().equals(oaid)) {
                OWLObjectProperty oaTieneComponente = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "oaTieneComponente"));
                for (OWLNamedIndividual ra : reasonerOntoU.getObjectPropertyValues(oaIndividual, oaTieneComponente).getFlattened()) {
                    OWLObjectProperty raOARefinaRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "raOARefinaRAAsignatura"));
                    for (OWLNamedIndividual raasig : reasonerOntoU.getObjectPropertyValues(ra, raOARefinaRAAsignatura).getFlattened()) {
                        raasigDeOA.add(raasig.getIRI().getShortForm());
                    }
                }

            }
        }
        return raasigDeOA;

    }

    @GetMapping("/unidadesTemasTopicosOntoU")
    public ResponseEntity<AsignaturaDto> obtenerUnidadesConTopicos(@RequestParam String asignatura) {
        try {
            // Llama al servicio para obtener las unidades con sus tópicos
            AsignaturaDto asignaturaDto = new AsignaturaDto(asignatura);
            List<UnidadDto> unidadesDto = getUnidadesDeAsignatura(asignatura);
            List<String> raAsignaturaList = getRAAsignaturaList(asignatura);
            asignaturaDto.setUnidades(unidadesDto);
            asignaturaDto.setRAAsignaturaList(raAsignaturaList);
            return new ResponseEntity<>(asignaturaDto, HttpStatus.OK); // Retorna la lista en formato JSON
        } catch (Exception e) {
            e.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    
    private List<String> getRAAsignaturaList(String asignatura) {
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLClass asignaturaClass = dataFactory.getOWLClass(IRI.create(baseIRI+"Asignatura"));

        List<String> raAsignaturaList = new ArrayList<>();

        for (OWLNamedIndividual asignaturaIndividual : reasonerOntoU.getInstances(asignaturaClass, false).getFlattened()) {
            if (asignaturaIndividual.getIRI().getShortForm().equals(asignatura)) {
                OWLObjectProperty asignaturaTieneRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"asignaturaTieneRAAsignatura"));
                for (OWLNamedIndividual raAsignatura : reasonerOntoU.getObjectPropertyValues(asignaturaIndividual, asignaturaTieneRAAsignatura).getFlattened()) {
                    System.out.println("raAsignatura");
                    System.out.println(raAsignatura.getIRI().getShortForm());
                    raAsignaturaList.add(raAsignatura.getIRI().getShortForm());
                }
                break;
            }
        }
        return raAsignaturaList;
    }

    private List<UnidadDto> getUnidadesDeAsignatura(String asignatura) {
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLClass asignaturaClass = dataFactory.getOWLClass(IRI.create(baseOntoU + "Asignatura"));

        List<UnidadDto> unidades = new ArrayList<>();

        for (OWLNamedIndividual asignaturaIndividual : reasonerOntoU.getInstances(asignaturaClass, false).getFlattened()) {
            if (asignaturaIndividual.getIRI().getShortForm().equals(asignatura)) {
                OWLObjectProperty tieneContenidoMinimo = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU + "asignaturaTieneContenidoMinimo"));
                for (OWLNamedIndividual contenidoMinimo : reasonerOntoU.getObjectPropertyValues(asignaturaIndividual, tieneContenidoMinimo).getFlattened()) {
                    System.out.println("contenidoMinimo");
                    System.out.println(contenidoMinimo.getIRI().getShortForm());

                    OWLObjectProperty seOrganizaEnUnidad = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU + "contenidoMinimoSeOrganizaEnUnidad"));

                    for (OWLNamedIndividual unidad : reasonerOntoU.getObjectPropertyValues(contenidoMinimo, seOrganizaEnUnidad).getFlattened()) {
                        
    
    
                        UnidadDto unidadDto= procesarUnidad(unidad);
                        unidades.add(unidadDto);
                    }

                }
                
                break;
            }
            
        }

        return unidades;
    }

   
    

    private UnidadDto procesarUnidad(OWLNamedIndividual unidad) {
        UnidadDto unidadDto = new UnidadDto(unidad.getIRI().getShortForm());
        
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLObjectProperty compuestaDeTema = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU + "unidadCompuestaDeTema"));

        for (OWLIndividual tema : reasonerOntoU.getObjectPropertyValues(unidad, compuestaDeTema).getFlattened()) {
            TemaDto temaDto = procesarTema(tema.asOWLNamedIndividual());
            unidadDto.getTemas().add(temaDto);
        }

        return unidadDto;
    }

    private TemaDto procesarTema(OWLNamedIndividual tema) {
        TemaDto temaDto = new TemaDto(tema.getIRI().getShortForm());

        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLObjectProperty contieneTopico = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU + "temaContieneTopico"));

        for (OWLIndividual topico : reasonerOntoU.getObjectPropertyValues(tema, contieneTopico).getFlattened()) {
            TopicoDto topicoDto = procesarTopico(topico.asOWLNamedIndividual());
            temaDto.getTopicos().add(topicoDto);
        }

        OWLObjectProperty contieneTopicoSoporte = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU + "temaContieneTopicoSoporte"));

        for (OWLIndividual topicoSoporte : reasonerOntoU.getObjectPropertyValues(tema, contieneTopicoSoporte).getFlattened()) {
            TopicoDto topicoDto = procesarTopico(topicoSoporte.asOWLNamedIndividual());
            temaDto.getTopicosSoporte().add(topicoDto);
        }

        temaDto.getTopicos().removeAll(temaDto.getTopicosSoporte());

        return temaDto;
    }

    private TopicoDto procesarTopico(OWLNamedIndividual topico) {
        TopicoDto topicoDto = new TopicoDto(topico.getIRI().getShortForm());

        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();

        // Procesar subcategorías: parte, tipo, soporte
        OWLObjectProperty topicoTieneParte = dataFactory.getOWLObjectProperty(IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT#topicoTieneParte"));
        OWLObjectProperty topicoTieneTipo = dataFactory.getOWLObjectProperty(IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT#topicoTieneTipo"));
        OWLObjectProperty topicoTieneSoporte = dataFactory.getOWLObjectProperty(IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT#topicoTieneSoporte"));

        // Obtener valores de propiedades usando el razonador
        for (OWLIndividual subTopicoParte : reasonerOntoU.getObjectPropertyValues(topico, topicoTieneParte).getFlattened()) {
            TopicoDto subTopicoDto = procesarTopico(subTopicoParte.asOWLNamedIndividual());  // Llamada recursiva
            topicoDto.getParte().add(subTopicoDto);
        }

        for (OWLIndividual subTopicoTipo : reasonerOntoU.getObjectPropertyValues(topico, topicoTieneTipo).getFlattened()) {
            TopicoDto subTopicoDto = procesarTopico(subTopicoTipo.asOWLNamedIndividual());  // Llamada recursiva
            topicoDto.getTipo().add(subTopicoDto);
        }

        for (OWLIndividual subTopicoSoporte : reasonerOntoU.getObjectPropertyValues(topico, topicoTieneSoporte).getFlattened()) {
            TopicoDto subTopicoDto = procesarTopico(subTopicoSoporte.asOWLNamedIndividual());  // Llamada recursiva
            topicoDto.getSoporte().add(subTopicoDto);
        }

        return topicoDto;  // Devuelve el tópico con las subcategorías procesadas
    }


    // Method to insert an axiom into the ontology
    @PostMapping("/insertAxiom")
    public String insertAxiom(@RequestParam String individualName, 
                              @RequestParam String propertyName, 
                              @RequestParam String target) {
        try {
            // Create an individual
            OWLNamedIndividual individual = dataFactory.getOWLNamedIndividual(":" + individualName, pm);

            // Check if the property is a data property or object property
            OWLEntity property = dataFactory.getOWLEntity(EntityType.OBJECT_PROPERTY, IRI.create(pm.getDefaultPrefix() + propertyName));
            
            if (property.isOWLObjectProperty()) {
                // It's an object property (relationship between individuals)
                OWLObjectProperty objectProperty = property.asOWLObjectProperty();
                OWLNamedIndividual targetIndividual = dataFactory.getOWLNamedIndividual(":" + target, pm);

                // Create an object property assertion axiom (individual -> property -> targetIndividual)
                OWLObjectPropertyAssertionAxiom axiom = dataFactory.getOWLObjectPropertyAssertionAxiom(objectProperty, individual, targetIndividual);

                // Add the axiom to the ontology
                manager.addAxiom(ontologyConocimiento, axiom);
                
            } else if (property.isOWLDataProperty()) {
                // It's a data property (relationship between individual and data value)
                OWLDataProperty dataProperty = property.asOWLDataProperty();

                // Assuming the target is a literal value (e.g., a string or number)
                OWLLiteral literal = dataFactory.getOWLLiteral(target);

                // Create a data property assertion axiom (individual -> property -> literal)
                OWLDataPropertyAssertionAxiom axiom = dataFactory.getOWLDataPropertyAssertionAxiom(dataProperty, individual, literal);

                // Add the axiom to the ontology
                manager.addAxiom(ontologyConocimiento, axiom);
            } else {
                return "Property type is not recognized.";
            }

            // Save the ontology after adding the axiom
            manager.saveOntology(ontologyConocimiento);

            return "Axiom successfully added to the ontology.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error while inserting axiom: " + e.getMessage();
        }
    }

    @PostMapping("/createNewOA")
    public String createNewOA(@RequestParam String oaid) {
        try {
            //TODO implementar ver si ya esxiste el individuo para no hacer sincronizar.
            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            //  Create individuals
            OWLNamedIndividual oa = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "OA" + oaid));
            OWLNamedIndividual ra = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "RA" + oaid));
            OWLNamedIndividual evaluacion = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Evaluacion" + oaid));
            OWLNamedIndividual estructuraDeMetadato = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "EstructuraDeMetadato" + oaid));
            OWLNamedIndividual contenido = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion" + oaid));
            OWLNamedIndividual actividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Actividad" + oaid));

            // Define classes
            OWLClass oaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "OA"));
            OWLClass raClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ResultadoAprendizajeOA"));
            OWLClass evaluacionClass = dataFactory.getOWLClass(IRI.create(baseIRI + "Evaluacion"));
            OWLClass estructuraDeMetadatoClass = dataFactory.getOWLClass(IRI.create(baseIRI + "EstructuraDeMetadato"));
            OWLClass contenidoClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ContenidoDeInstruccion"));
            OWLClass actividadClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ActividadDeAprendizaje"));

            // Create axioms
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(oaClass, oa));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(raClass, ra));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(evaluacionClass, evaluacion));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(estructuraDeMetadatoClass, estructuraDeMetadato));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(contenidoClass, contenido));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(actividadClass, actividad));

            // Create Object Properties
            OWLObjectProperty oaTieneComponente = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "oaTieneComponente"));

            // Create relationships
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, ra));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, evaluacion));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, estructuraDeMetadato));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, contenido));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, actividad));

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);


            return "Individual '" + oaid + "' added to class 'OA' successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to insert individual '" + oaid + "' to class 'OA'. Error: " + e.getMessage();
        }
    }

    @PostMapping("/linkTopicToOA")
    public String linkTopicToOA(@RequestParam String oaid, @RequestParam String idTopic) {
        try {
            // INSERT DATA {
            //     oaca:Contenido{$oaid} oaca:contenidoDesarrollaTopico  oaca:{$idTopico}.
            // }

            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            //Crear individuo Topico primero
            // Create the individual and the class
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + idTopic));
            OWLClass topicoOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Topico"));

            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(topicoOwlClass, topico);

            // Apply the change (Add the Axiom to the Ontology)
            manager.addAxiom(ontologyConocimiento, classAssertion);            

            //Hacer la relacion con el ContenidoDeIstruccion(OAID)
            OWLNamedIndividual contenido = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion" + oaid));

            // Create Object Properties
            OWLObjectProperty contenidoDesarrollaTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "contenidoDeInstruccionDesarrollaTopico"));

            // Create relationships
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(contenidoDesarrollaTopico, contenido, topico));

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);


            return "Topic linked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to link Topic. Error: " + e.getMessage();
        }
    }

    @PostMapping("/unlinkTopicToOA")
    public String unlinkTopicToOA(@RequestParam String oaid, @RequestParam String idTopic) {
        try {
            // DELETE DATA {
            //     oaca:Contenido{$oaid} oaca:contenidoDesarrollaTopico  oaca:{$idTopico}.
            // }

            
            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            // Create individuals
            OWLNamedIndividual contenido = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion" + oaid));
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + idTopic));

            // Define the object property
            OWLObjectProperty contenidoDesarrollaTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "contenidoDeInstruccionDesarrollaTopico"));

            // Create the axiom to remove
            OWLAxiom axiomToRemove = dataFactory.getOWLObjectPropertyAssertionAxiom(contenidoDesarrollaTopico, contenido, topico);

            // Remove the axiom
            manager.removeAxiom(ontologyConocimiento, axiomToRemove);


            //Eliminar individuo Topico 
            // Remove all axioms where the individual is involved
            for (OWLAxiom axiom : ontologyConocimiento.getReferencingAxioms(topico)) {
                manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
            }

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);

            return "Topic unlinked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to unlink Topic. Error: " + e.getMessage();
        }
    }

    @PostMapping("/insertIndividual")
    public String insertIndividual(@RequestParam String individualName, @RequestParam String className) {
        try {
            //TODO implementar ver si ya esxiste el individuo para no hacer sincronizar.
            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory factory = manager.getOWLDataFactory();

            // Create the individual and the class
            OWLNamedIndividual individual = factory.getOWLNamedIndividual(IRI.create(baseIRI + individualName));
            OWLClass owlClass = factory.getOWLClass(IRI.create(baseIRI  + className));

            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertion = factory.getOWLClassAssertionAxiom(owlClass, individual);

            // Apply the change (Add the Axiom to the Ontology)
            manager.addAxiom(ontologyConocimiento, classAssertion);

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);

            return "Individual '" + individualName + "' added to class '" + className + "' successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to insert individual '" + individualName + "' to class '" + className + "'. Error: " + e.getMessage();
        }
    }

    
    @GetMapping("/synchronizeReasoner")
    public void synchronizeReasoner(@RequestParam String ontologia) throws Exception {
        System.out.println("synchronizeReasoner");
        if(ontologia.equals("CONOCIMIENTO")){
            reasonerConocimiento.flush();  // Sincroniza los cambios
            System.out.println("synchronizeReasoner: end flush");
            reasonerConocimiento.precomputeInferences(InferenceType.CLASS_ASSERTIONS);

        }
        else{
            reasonerOntoU.flush();  // Sincroniza los cambios
            System.out.println("synchronizeReasoner: end flush");
            reasonerOntoU.precomputeInferences(InferenceType.CLASS_ASSERTIONS);
        }
        

        System.out.println("synchronizeReasoner: finished Precopute");

    }

}

