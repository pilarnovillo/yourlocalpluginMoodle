package com.example;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
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
import com.fasterxml.jackson.databind.JsonNode;
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
import java.util.Optional;
import java.util.Set;






@RestController
@RequestMapping("/ontology")
public class OntologyController {
    private static final String baseOntoU = "http://www.semanticweb.org/valer/ontologies/OntoU#";
    private static final String baseOntoT = "http://www.semanticweb.org/valer/ontologies/OntoT#";
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
            OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
            // Llama al servicio para obtener las unidades con sus tópicos
            AsignaturaDto asignaturaDto;

            // Identificar la clase Asignatura
            OWLClass asignaturaClass = dataFactory.getOWLClass(IRI.create(baseOntoU + "Asignatura"));

            // Identificar la propiedad de datos (nombre)
            OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "nombre"));

            // Buscar el primer individuo que tiene la propiedad nombre igual a nombreBuscado y que sea de tipo Asignatura
            Optional<OWLNamedIndividual> individuoEncontrado = ontologyOntoU.getIndividualsInSignature()
                    .stream()
                    .filter(individuo -> ontologyOntoU.getDataPropertyAssertionAxioms(individuo)
                            .stream()
                            .anyMatch(axiom -> axiom.getProperty().equals(nombrePropiedad) &&
                                               axiom.getObject().getLiteral().equals(asignatura)))
                    .filter(individuo -> ontologyOntoU.getClassAssertionAxioms(individuo)
                            .stream()
                            .anyMatch(axiom -> axiom.getClassesInSignature().contains(asignaturaClass)))
                    .findFirst();  // Solo queremos el primer individuo que cumpla la condición

            // Mostrar el resultado
            if (individuoEncontrado.isPresent()) {
                String asignaturaIRI = individuoEncontrado.get().getIRI().getShortForm();
                System.out.println("Se encontró la asignatura: " + individuoEncontrado.get().getIRI().getShortForm());
                // Llama al servicio para obtener las unidades con sus tópicos
                asignaturaDto = new AsignaturaDto(asignatura, asignaturaIRI);

                List<UnidadDto> unidadesDto = getUnidadesDeAsignatura(asignaturaIRI);
                List<String> raAsignaturaList = getRAAsignaturaList(asignaturaIRI);
                asignaturaDto.setUnidades(unidadesDto);
                asignaturaDto.setRAAsignaturaList(raAsignaturaList);
                return new ResponseEntity<>(asignaturaDto, HttpStatus.OK); // Retorna la lista en formato JSON
            } else {
                System.out.println("No se encontró ninguna asignatura con el nombre " + asignatura);
                return  new ResponseEntity<>(null, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Manejo de excepciones
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    
    private List<String> getRAAsignaturaList(String asignatura) {
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLClass asignaturaClass = dataFactory.getOWLClass(IRI.create(baseOntoU+"Asignatura"));

        List<String> raAsignaturaList = new ArrayList<>();

        for (OWLNamedIndividual asignaturaIndividual : reasonerOntoU.getInstances(asignaturaClass, false).getFlattened()) {
            if (asignaturaIndividual.getIRI().getShortForm().equals(asignatura)) {
                OWLObjectProperty asignaturaTieneRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU+"asignaturaTieneRAAsignatura"));
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
                
                // Identificar la propiedad de datos (descripcion)
                OWLDataProperty descripcionPropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "descripcion"));

                for (OWLNamedIndividual contenidoMinimo : reasonerOntoU.getObjectPropertyValues(asignaturaIndividual, tieneContenidoMinimo).getFlattened()) {
                    System.out.println("contenidoMinimo");
                    System.out.println(contenidoMinimo.getIRI().getShortForm());

                    Optional<OWLLiteral> descripcionContenidoMinimo = ontologyOntoU.getDataPropertyAssertionAxioms(contenidoMinimo)
                    .stream()
                    .filter(axiom -> axiom.getProperty().equals(descripcionPropiedad))
                    .map(OWLDataPropertyAssertionAxiom::getObject)
                    .findFirst();

                    if (descripcionContenidoMinimo.isPresent()) {
                        System.out.println("El nombre actual es: " + descripcionContenidoMinimo.get().getLiteral());
                    } else {
                        System.out.println("No se encontró ningún valor para el nombre.");
                    }

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
        UnidadDto unidadDto;
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        
        // Identificar la propiedad de datos (nombre)
        OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "nombre"));

        Optional<OWLLiteral> nombreUnidad = ontologyOntoU.getDataPropertyAssertionAxioms(unidad)
                        .stream()
                        .filter(axiom -> axiom.getProperty().equals(nombrePropiedad))
                        .map(OWLDataPropertyAssertionAxiom::getObject)
                        .findFirst();

        if (nombreUnidad.isPresent()) {
            System.out.println("El nombre actual es: " + nombreUnidad.get().getLiteral());
            unidadDto = new UnidadDto(nombreUnidad.get().getLiteral(), unidad.getIRI().getShortForm());
        } else {
            System.out.println("No se encontró ningún valor para el nombre.");
            unidadDto = new UnidadDto("", unidad.getIRI().getShortForm());
        }
        
        
        OWLObjectProperty compuestaDeTema = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU + "unidadCompuestaDeTema"));

        for (OWLIndividual tema : reasonerOntoU.getObjectPropertyValues(unidad, compuestaDeTema).getFlattened()) {
            TemaDto temaDto = procesarTema(tema.asOWLNamedIndividual());
            unidadDto.getTemas().add(temaDto);
        }

        return unidadDto;
    }

    private TemaDto procesarTema(OWLNamedIndividual tema) {
        TemaDto temaDto;

        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        // Identificar la propiedad de datos (nombre)
        OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "nombre"));

        Optional<OWLLiteral> nombreTema = ontologyOntoU.getDataPropertyAssertionAxioms(tema)
                        .stream()
                        .filter(axiom -> axiom.getProperty().equals(nombrePropiedad))
                        .map(OWLDataPropertyAssertionAxiom::getObject)
                        .findFirst();

        if (nombreTema.isPresent()) {
            System.out.println("El nombre actual es: " + nombreTema.get().getLiteral());
            temaDto = new TemaDto(nombreTema.get().getLiteral(), tema.getIRI().getShortForm());
        } else {
            System.out.println("No se encontró ningún valor para el nombre.");
            temaDto = new TemaDto("", tema.getIRI().getShortForm());
        }

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
        TopicoDto topicoDto;

        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();

        // Identificar la propiedad de datos (nombre)
        OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create("http://www.semanticweb.org/valer/ontologies/OntoU#nombre"));

        Optional<OWLLiteral> nombreTopico = ontologyOntoU.getDataPropertyAssertionAxioms(topico)
                        .stream()
                        .filter(axiom -> axiom.getProperty().equals(nombrePropiedad))
                        .map(OWLDataPropertyAssertionAxiom::getObject)
                        .findFirst();

        if (nombreTopico.isPresent()) {
            System.out.println("El nombre actual es: " + nombreTopico.get().getLiteral());
            topicoDto = new TopicoDto(nombreTopico.get().getLiteral(), topico.getIRI().getShortForm());
        } else {
            System.out.println("No se encontró ningún valor para el nombre.");
            topicoDto = new TopicoDto("", topico.getIRI().getShortForm());
        }

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
            OWLNamedIndividual ra = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));
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
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopic));
            OWLClass topicoOwlClass = dataFactory.getOWLClass(IRI.create(baseOntoT  + "Topico"));

            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(topicoOwlClass, topico);

            // Apply the change (Add the Axiom to the Ontology)
            manager.addAxiom(ontologyConocimiento, classAssertion);     
            
            //TODO Setear el nombre al Topico 

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
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopic));

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

            //Eliminar el Episodio del Topico
            eliminarIndividuosPorCadena("_"+idTopic);

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);

            return "Topic unlinked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to unlink Topic. Error: " + e.getMessage();
        }
    }

    public String eliminarIndividuosPorCadena(String cadenaBusqueda) {
        try {
            // Obtener todos los individuos en la ontología
            Set<OWLNamedIndividual> individuos = ontologyConocimiento.getIndividualsInSignature();
    
            // Contador para los individuos eliminados
            int contadorEliminados = 0;
    
            // Filtrar los individuos cuyo IRI contenga la cadena de búsqueda
            for (OWLNamedIndividual individuo : individuos) {
                String iriIndividuo = individuo.getIRI().toString();
    
                // Verificar si el nombre del individuo (IRI) contiene la cadena de búsqueda
                if (iriIndividuo.endsWith(cadenaBusqueda)) {
                    // Obtener todos los axiomas relacionados con el individuo
                    Set<OWLAxiom> axiomasReferentes = ontologyConocimiento.getReferencingAxioms(individuo);
    
                    // Eliminar todos los axiomas relacionados con el individuo
                    for (OWLAxiom axiom : axiomasReferentes) {
                        manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
                    }
    
                    // Aumentar el contador de individuos eliminados
                    contadorEliminados++;
                }
            }
    
            // Retornar un mensaje indicando cuántos individuos fueron eliminados
            return contadorEliminados + " individuos eliminados que contenían '" + cadenaBusqueda + "' en su nombre.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar individuos: " + e.getMessage();
        }
    }

    @PostMapping("/insertUnidad")
    public String insertUnidad(@RequestParam String unidad) {
        try {
            //TODO remove any previous Unidad Individual

            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            // Create the individual and the class
            OWLNamedIndividual unidadIndividuo = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + unidad));
            OWLClass unidadOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Unidad"));

            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(unidadOwlClass, unidadIndividuo);

            // Apply the change (Add the Axiom to the Ontology)
            manager.addAxiom(ontologyConocimiento, classAssertion);            

            //TODO hacer relacion con Asignatura/Contenido Minimo

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);


            return "Unidad created successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create Unidad. Error: " + e.getMessage();
        }
    }

    @PostMapping("/linkRAAsignaturaToOA")
    public String linkRAAsignaturaToOA(@RequestParam String oaid, @RequestParam String idRAAsignatura) {
        try {
            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            //Crear individuo RAAsignatura primero
            // Create the individual and the class
            OWLNamedIndividual resultadoAprendizajeAsignatura = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + idRAAsignatura));
            OWLClass resultadoAprendizajeAsignaturaOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "ResultadoAprendizajeAsignatura"));

            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(resultadoAprendizajeAsignaturaOwlClass, resultadoAprendizajeAsignatura);

            // Apply the change (Add the Axiom to the Ontology)
            manager.addAxiom(ontologyConocimiento, classAssertion);            

            //Hacer la relacion con el ResultadoAprendizajeOA(OAID)
            OWLNamedIndividual raOA = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));

            // Create Object Properties
            OWLObjectProperty raOARefinaRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "raOARefinaRAAsignatura"));

            // Create relationships
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(raOARefinaRAAsignatura, raOA, resultadoAprendizajeAsignatura));

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);


            return "Topic linked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to link Topic. Error: " + e.getMessage();
        }
    }

    @PostMapping("/unlinkRAAsignaturaToOA")
    public String unlinkRAAsignaturaToOA(@RequestParam String oaid, @RequestParam String idRAAsignatura) {
        try {
            
            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            // Define individuals
            OWLNamedIndividual resultadoAprendizajeAsignatura = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + idRAAsignatura));
            OWLNamedIndividual raOA = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));

            // Define the object property
            OWLObjectProperty raOARefinaRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "raOARefinaRAAsignatura"));

            // Create the axiom to remove
            OWLAxiom axiomToRemove = dataFactory.getOWLObjectPropertyAssertionAxiom(raOARefinaRAAsignatura, raOA, resultadoAprendizajeAsignatura);

            // Remove the axiom
            manager.removeAxiom(ontologyConocimiento, axiomToRemove);

            //Eliminar individuo  
            // Remove all axioms where the individual is involved
            for (OWLAxiom axiom : ontologyConocimiento.getReferencingAxioms(resultadoAprendizajeAsignatura)) {
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


    @PostMapping("/createTopicsRelations")
    public String createTopicsRelations(@RequestBody List<NodeDto> nodes) throws OWLOntologyStorageException {
        // Get OWL Data Factory and Ontology Manager
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();
        
        //Eliminar todos los temas TODO?

        // Aquí puedes procesar el array de nodos
        for (NodeDto node : nodes) {
            String temaId = node.getName();
            processNode(node, 0, null, manager, dataFactory, temaId);  // Nivel inicial 0
            // Procesa los datos de cada nodo
        }

        return "Nodes processed successfully";
    }

    // Método recursivo para procesar nodos y sus hijos
    private void processNode(NodeDto node, int level, String parent, OWLOntologyManager manager, OWLDataFactory dataFactory, String temaId) throws OWLOntologyStorageException {
        // Procesar el nodo actual
        System.out.println("Node Name: " + node.getName() + ", Level: " + level+", Node Parent: " + parent+", Node relation: " + node.getRelation());

        // Definir las propiedades de objeto de Tema
        OWLObjectProperty temaContieneTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "temaContieneTopico"));
        OWLObjectProperty temaContieneTopicoSoporte = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "temaContieneTopicoSoporte"));


        if (level == 0) {//es un Tema
            
            //Crear individuo Tema 
            OWLNamedIndividual tema = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + node.getName()));
            OWLClass temaOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Tema"));

            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(temaOwlClass, tema);

            // Apply the change (Add the Axiom to the Ontology)
            manager.addAxiom(ontologyConocimiento, classAssertion); 

            System.out.println("Eliminar relaciones que tenia Tema");//TODO
            
            // Obtener las aserciones de propiedades de objeto que refieren al individuo "tema"
            for (OWLObjectPropertyAssertionAxiom axiom : ontologyConocimiento.getObjectPropertyAssertionAxioms(tema)) {
                // Verificar si la propiedad es "temaContieneTopico" o "temaContieneTopicoSoporte"
                if (axiom.getProperty().equals(temaContieneTopico) || axiom.getProperty().equals(temaContieneTopicoSoporte)) {
                    // Aplicar el cambio para eliminar el axioma
                    manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
                }
            }

            // Save ontology after modification if necessary
            manager.saveOntology(ontologyConocimiento);
        }
        else{//Es un Topico
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + node.getName()));
            OWLObjectProperty topicoPerteneceATema = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "topicoPerteneceATema"));

            //Crear individuo EpisodioDeAprendizaje 
            OWLNamedIndividual episodioDeAprendizaje = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI +"EpisodioDeAprendizaje_" + node.getName()));
            OWLClass episodioDeAprendizajeOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "EpisodioDeAprendizaje"));
            // Create a Class Assertion Axiom (individual is an instance of the class)
            OWLClassAssertionAxiom classAssertionEpisodioDeAprendizaje = dataFactory.getOWLClassAssertionAxiom(episodioDeAprendizajeOwlClass, episodioDeAprendizaje);
            OWLObjectProperty elementoFormaParteDeEpisodioDeAprendizaje = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "elementoFormaParteDeEpisodioDeAprendizaje"));
            
            if (level-1==0) {//El padre es un Tema
                OWLNamedIndividual parentTemaIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + parent));
                manager.addAxiom(ontologyConocimiento, classAssertionEpisodioDeAprendizaje);
                manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(elementoFormaParteDeEpisodioDeAprendizaje, topico, episodioDeAprendizaje));
                    
                if (node.getRelation().equals("soporte")) {
                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(temaContieneTopicoSoporte, parentTemaIndividual, topico));
                }
                else{
                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(temaContieneTopico, parentTemaIndividual, topico));
                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(topicoPerteneceATema, topico, parentTemaIndividual));
                }
            }
            else{
                OWLNamedIndividual parentTopicoIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + parent));
                OWLNamedIndividual temaIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + temaId));

                if (node.getRelation().equals("soporte")) {
                    OWLObjectProperty topicoEsSoporteDeTopico = dataFactory.getOWLObjectProperty(IRI.create(baseOntoT + "topicoEsSoporteDeTopico"));
                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(topicoEsSoporteDeTopico, topico, parentTopicoIndividual));

                    //Crear individuo EpisodioDeAprendizaje 
                    OWLNamedIndividual episodioSoporte = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI +"EpisodioSoporte_" + node.getName()));
                    OWLClass episodioSoportejeOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "EpisodioSoporte"));
                    // Create a Class Assertion Axiom (individual is an instance of the class)
                    OWLClassAssertionAxiom classAssertionEpisodioSoporte = dataFactory.getOWLClassAssertionAxiom(episodioSoportejeOwlClass, episodioSoporte);
                    OWLObjectProperty elementoFormaParteDeSubEpisodioDeAprendizaje = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "elementoFormaParteDeSubEpisodioDeAprendizaje"));
                    manager.addAxiom(ontologyConocimiento, classAssertionEpisodioSoporte);
                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(elementoFormaParteDeSubEpisodioDeAprendizaje, topico, episodioSoporte));

                }
                else{
                    manager.addAxiom(ontologyConocimiento, classAssertionEpisodioDeAprendizaje);
                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(elementoFormaParteDeEpisodioDeAprendizaje, topico, episodioDeAprendizaje));

                    if (node.getRelation().equals("parte")) { 
                        OWLObjectProperty topicoEsParteDeTopico = dataFactory.getOWLObjectProperty(IRI.create(baseOntoT + "topicoEsParteDeTopico"));
                        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(topicoEsParteDeTopico, topico, parentTopicoIndividual));
                        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(topicoPerteneceATema, topico, temaIndividual));
                    }
                    else{
                        OWLObjectProperty topicoEsUnTipoDeTopico = dataFactory.getOWLObjectProperty(IRI.create(baseOntoT + "topicoEsUnTipoDeTopico"));
                        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(topicoEsUnTipoDeTopico, topico, parentTopicoIndividual));
                        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(topicoPerteneceATema, topico, temaIndividual));
                    }
                }
                 
            }
            manager.saveOntology(ontologyConocimiento);

        }

        // Procesar los children (si existen)
        if (node.getChildren() != null && !node.getChildren().isEmpty()) {
            for (NodeDto child : node.getChildren()) {
                // Llamada recursiva para procesar cada child
                processNode(child, level + 1, node.getName(), manager, dataFactory, temaId);
            }
        }
    }

    @PostMapping("/setOrdenDeDesarrollo")
    public String setOrdenDeDesarrollo(@RequestBody List<String> topicos) {
        try {
            // Get OWL Data Factory and Ontology Manager
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            // Iterar sobre los nombres de los tópicos en el array
            for (int i = 0; i < topicos.size(); i++) {
                String idTopico = topicos.get(i);
                System.out.println("orden para:"+idTopico);
                int ordenDeDesarrollo = i + 1;  // El índice empieza en 0, pero el orden en 1

                // Lógica para encontrar el individuo del tópico
                OWLNamedIndividual topicoIndividuo = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopico));

                // Definir la propiedad de datos 'ordenDeDesarrollo'
                OWLDataProperty ordenDeDesarrolloPropiedad = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "ordenDeDesarrollo"));

                // Eliminar la relación existente (si existe)
                Set<OWLDataPropertyAssertionAxiom> axiomasExistentes = ontologyConocimiento.getDataPropertyAssertionAxioms(topicoIndividuo);
                for (OWLDataPropertyAssertionAxiom axiom : axiomasExistentes) {
                    if (axiom.getProperty().equals(ordenDeDesarrolloPropiedad)) {
                        manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
                    }
                }

                // Crear un axioma de aserción de la propiedad de datos
                OWLDataPropertyAssertionAxiom axiom = dataFactory.getOWLDataPropertyAssertionAxiom(
                    ordenDeDesarrolloPropiedad, topicoIndividuo, ordenDeDesarrollo
                );

                // Aplicar el cambio en la ontología
                manager.addAxiom(ontologyConocimiento, axiom);
            }
            manager.saveOntology(ontologyConocimiento);
            // Devolver una respuesta de éxito
            return "Propiedad ordenDeDesarrollo asignada correctamente";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al asignar la propiedad ordenDeDesarrollo";
        }
    }

    @PostMapping("/analyzeMultiChoiceAnalyzer")
    public List<Question> analyzeMultiChoiceAnalyzer(@RequestBody JsonNode jsonNode) throws Exception {
        List<Question> questions = new ArrayList<>();

        // Llamamos al método de análisis que ya tienes
        MultiChoiceAnalyzer.analyze(jsonNode, questions);

        return questions; // Retornamos la lista de preguntas procesadas
    }

    @PostMapping("/analyzeSingleChoiceAnalyzer")
    public List<Question> analyzeSingleChoiceAnalyzer(@RequestBody JsonNode jsonNode) throws Exception {
        List<Question> questions = new ArrayList<>();

        // Llamamos al método de análisis que ya tienes
        SingleChoiceAnalyzer.analyze(jsonNode, questions);

        return questions; // Retornamos la lista de preguntas procesadas
    }

    @PostMapping("/analyzeCoursePresentation")
    public List<Slide> analyzeCoursePresentation(@RequestBody JsonNode jsonNode) throws Exception {
        JsonNode coursePresentationNode = jsonNode.get("params").get("presentation").get("slides");

        List<Slide> slides = new ArrayList<>();
        for (JsonNode slideNode : coursePresentationNode) {
            Slide slide = new Slide();
            List<Element> elements = new ArrayList<>();
            
            // Recorrer los elementos dentro de cada diapositiva
            if(slideNode.has("elements")){
                for (JsonNode elementNode : slideNode.get("elements")) {
                    Element element = new Element();
                    
                    String library = elementNode.get("action").get("library").asText();
                    JsonNode params = elementNode.get("action").get("params");
                    
                    // Procesar según el tipo de elemento
                    switch (library) {
                        case "H5P.AdvancedText 1.1":
                            element.setType("Text");
                            element.setText(params.get("text").asText());
                            break;
                            
                        case "H5P.Image 1.1":
                            element.setType("Image");
                            element.setImagePath(params.get("file").get("path").asText());
                            break;
                            
                        case "H5P.MultiChoice 1.16":
                            element.setType("MultiChoice");
                            List<Question> questions = new ArrayList<>();
    
                            // Llamamos al método de análisis que ya tienes
                            MultiChoiceAnalyzer.analyze(elementNode.get("action"), questions);
                            element.setParams(questions);
                            break;
                            
                        // case "H5P.TrueFalse 1.8":
                        //     element.setType("TrueFalse");
                        //     element.setQuestion(params.get("question").asText());
                        //     element.setCorrect(params.get("correct").asBoolean());
                        //     break;
                            
                        // Puedes agregar más casos según los tipos que necesites procesar
                    }
                    
                    elements.add(element);
                }
            }
            
            
            slide.setElements(elements);
            slides.add(slide);
        }
        

        return slides; // Retornamos la lista de preguntas procesadas
    }

    @PostMapping("/insertSubactividad")
    public String insertSubactividad(@RequestParam String idSubact, @RequestParam String oaid,  @RequestParam String idTopico,
     @RequestBody List<String> tipoDeActividades) {
        
        
        return oaid;


    }

    @PostMapping("/insertEjemplo")
    public String insertEjemplo(@RequestParam String idEjemplo, @RequestParam String oaid,  @RequestParam String idTopico,
     @RequestBody List<String> tipoDeActividades) {
        
        
        return oaid;


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

