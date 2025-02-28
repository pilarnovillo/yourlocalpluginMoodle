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

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
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
    private String baseOntoLOM ="http://www.semanticweb.org/valer/ontologies/OntoLOM#";

    private String oaid = "";
    
    public OntologyController() {
    }

    // Método para iniciar la creacion de un nuevo OA
    @CrossOrigin(origins = "http://localhost")
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

        IRI ontoLOMIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoLOM");
        // Mapea el IRI de la ontología importada a una ruta de archivo local.
        File ontoLOM = new File("C:\\Users\\piluc\\Downloads\\OntoLOM.owl");
        SimpleIRIMapper iriMapperOntoLOM = new SimpleIRIMapper(ontoLOMIRI, IRI.create(ontoLOM));
        // Agrega el IRIMapper al gestor de ontologías.
        manager.getIRIMappers().add(iriMapperOntoLOM);

        IRI ontoMETIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoMET");
        // Mapea el IRI de la ontología importada a una ruta de archivo local.
        File ontoMET = new File("C:\\Users\\piluc\\Downloads\\OntoMET.owl");
        SimpleIRIMapper iriMapperOntoMET = new SimpleIRIMapper(ontoMETIRI, IRI.create(ontoMET));
        // Agrega el IRIMapper al gestor de ontologías.
        manager.getIRIMappers().add(iriMapperOntoMET);

        IRI ontoOAIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoOA");
        // Mapea el IRI de la ontología importada a una ruta de archivo local.
        File ontoOA = new File("C:\\Users\\piluc\\Downloads\\Base 3 OntoOA y OntoT (2).owl");
        SimpleIRIMapper iriMapperOntoOA = new SimpleIRIMapper(ontoOAIRI, IRI.create(ontoOA));
        // Agrega el IRIMapper al gestor de ontologías.
        manager.getIRIMappers().add(iriMapperOntoOA);

        IRI ontoTIRI = IRI.create("http://www.semanticweb.org/valer/ontologies/OntoT");
        // Mapea el IRI de la ontología importada a una ruta de archivo local.
        File ontoT = new File("C:\\Users\\piluc\\Downloads\\OntoT.owl");
        SimpleIRIMapper iriMapperOntoT = new SimpleIRIMapper(ontoTIRI, IRI.create(ontoT));
        // Agrega el IRIMapper al gestor de ontologías.
        manager.getIRIMappers().add(iriMapperOntoT);

        ontologyConocimiento = manager.loadOntologyFromOntologyDocument(new File(copyConocimientoFilePath));

        ontologyOntoU = manager.loadOntologyFromOntologyDocument(new File("C:\\Users\\piluc\\Downloads\\OntoU.owl"));

        for (OWLOntology importedOntology : ontologyConocimiento.getImports()) {
            System.out.println("Imported ontology: " + importedOntology.getOntologyID());
        }

        return "Se recibieron los parámetros: " + oaid;
    }

    // Método para que la ontologia razone
    @CrossOrigin(origins = "http://localhost")
    @GetMapping("/razonar")
    public String razonar(@RequestParam String ontologia) throws Exception {
        Stopwatch stopwatch = Stopwatch.createStarted();
        // Crea un razonador Pellet.
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
    @CrossOrigin(origins = "http://localhost")
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

    // Método para obtener los topicos del OA.
    @CrossOrigin(origins = "http://localhost")
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

    // Método para obtener la Unidad del OA
    @CrossOrigin(origins = "http://localhost")
    @GetMapping("/getOAUnidad")
    public String getOAUnidad(@RequestParam String oaid) {
        String unidad="";
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();

        // Obtén la referencia a la clase Unidad (sustituye con el IRI adecuado de la clase Unidad)
        OWLClass unidadClass = dataFactory.getOWLClass(IRI.create(baseIRI+"Unidad"));

        // Obtener los individuos de la clase Unidad
        NodeSet<OWLNamedIndividual> individualsNodeSet = reasonerConocimiento.getInstances(unidadClass, false);

        // Extraer los individuos de la clase
        Set<OWLNamedIndividual> individuals = individualsNodeSet.getFlattened();

        // Verificar si hay individuos y obtener el primero
        if (!individuals.isEmpty()) {
            OWLNamedIndividual firstIndividual = individuals.iterator().next();
            unidad = firstIndividual.getIRI().getShortForm();
            System.out.println("Primer individuo de la clase Unidad: " + firstIndividual);
        } else {
            System.out.println("No hay individuos de la clase Unidad.");
        }
        return unidad;

    }

    // Método para obtener los RA de la Asignatura del OA.
    @CrossOrigin(origins = "http://localhost")
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

        for (OWLNamedIndividual oaIndividual : reasonerConocimiento.getInstances(oaClass, false).getFlattened()) {
            if (oaIndividual.getIRI().getShortForm().equals(oaid)) {
                OWLObjectProperty oaTieneComponente = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "oaTieneComponente"));
                for (OWLNamedIndividual ra : reasonerConocimiento.getObjectPropertyValues(oaIndividual, oaTieneComponente).getFlattened()) {
                    OWLObjectProperty raOARefinaRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "raOARefinaRAAsignatura"));
                    for (OWLNamedIndividual raasig : reasonerConocimiento.getObjectPropertyValues(ra, raOARefinaRAAsignatura).getFlattened()) {
                        raasigDeOA.add(raasig.getIRI().getShortForm());
                    }
                }

            }
        }
        return raasigDeOA;

    }

    // Método para obtener todas las unidades, temas y topicos de la asignatura.
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
                //Crear asignatura en Ontologia conocimiento
                OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
                OWLDataFactory factory = manager.getOWLDataFactory();
    
                OWLNamedIndividual individual = factory.getOWLNamedIndividual(IRI.create(baseIRI + individuoEncontrado.get().getIRI().getShortForm()));
                OWLClass owlClass = factory.getOWLClass(IRI.create(baseIRI  + "Asignatura"));
    
                OWLClassAssertionAxiom classAssertion = factory.getOWLClassAssertionAxiom(owlClass, individual);
    
                manager.addAxiom(ontologyConocimiento, classAssertion);

                // Identificar la propiedad de datos (nombre)
                OWLDataProperty nombrePropiedadBaseIRI = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "nombre"));

                // Crear un axioma de aserción de la propiedad de datos
                OWLDataPropertyAssertionAxiom nombreAsignaturaAxiom = dataFactory.getOWLDataPropertyAssertionAxiom(
                    nombrePropiedadBaseIRI, individual, asignatura
                );

                // Aplicar el cambio en la ontología
                manager.addAxiom(ontologyConocimiento, nombreAsignaturaAxiom);

                // Identificar la propiedad de datos (anio)
                OWLDataProperty anioPropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "anio"));

                Optional<OWLLiteral> anioAsignaturaOntoU = ontologyOntoU.getDataPropertyAssertionAxioms(individuoEncontrado.get())
                .stream().filter(axiom -> axiom.getProperty().equals(anioPropiedad)).map(OWLDataPropertyAssertionAxiom::getObject)
                .findFirst();

                // Identificar la propiedad de datos (anio)
                OWLDataProperty anioPropiedadBaseIRI = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "anio"));

                OWLDataPropertyAssertionAxiom axiomAnioAsignatura = dataFactory.getOWLDataPropertyAssertionAxiom(
                    anioPropiedadBaseIRI, individual, anioAsignaturaOntoU.get().getLiteral()
                );

                // Aplicar el cambio en la ontología
                manager.addAxiom(ontologyConocimiento, axiomAnioAsignatura);

                // Guardar ontologia
                manager.saveOntology(ontologyConocimiento);


                String asignaturaIRI = individuoEncontrado.get().getIRI().getShortForm();
                System.out.println("Se encontró la asignatura: " + individuoEncontrado.get().getIRI().getShortForm());
                // Llama al servicio para obtener las unidades con sus tópicos
                asignaturaDto = new AsignaturaDto(asignatura, asignaturaIRI);

                List<UnidadDto> unidadesDto = getUnidadesDeAsignatura(asignaturaIRI);
                List<RAAsignaturaDto> raAsignaturaList = getRAAsignaturaList(asignaturaIRI);
                asignaturaDto.setUnidades(unidadesDto);
                asignaturaDto.setRAAsignaturaList(raAsignaturaList);
                asignaturaDto.setVerbosList(getVerbos());
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

    
    // Método privado para obtner la lista de RA de la Asignatura
    private List<RAAsignaturaDto> getRAAsignaturaList(String asignatura) {
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();
        OWLClass asignaturaClass = dataFactory.getOWLClass(IRI.create(baseOntoU+"Asignatura"));

        List<RAAsignaturaDto> raAsignaturaList = new ArrayList<>();

        for (OWLNamedIndividual asignaturaIndividual : reasonerOntoU.getInstances(asignaturaClass, false).getFlattened()) {
            if (asignaturaIndividual.getIRI().getShortForm().equals(asignatura)) {
                OWLObjectProperty asignaturaTieneRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU+"asignaturaTieneRAAsignatura"));
                for (OWLNamedIndividual raAsignaturaIndividual : reasonerOntoU.getObjectPropertyValues(asignaturaIndividual, asignaturaTieneRAAsignatura).getFlattened()) {
                    RAAsignaturaDto raAsignaturaDto = new RAAsignaturaDto();
                    raAsignaturaDto.setId(raAsignaturaIndividual.getIRI().getShortForm());

                    // Identificar la propiedad de datos (nombre)
                    OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "nombre"));

                    Optional<OWLLiteral> nombreRAAsignatura = ontologyOntoU.getDataPropertyAssertionAxioms(raAsignaturaIndividual)
                                    .stream()
                                    .filter(axiom -> axiom.getProperty().equals(nombrePropiedad))
                                    .map(OWLDataPropertyAssertionAxiom::getObject)
                                    .findFirst();

                    if (nombreRAAsignatura.isPresent()) {
                        System.out.println("El nombre actual es: " + nombreRAAsignatura.get().getLiteral());
                        raAsignaturaDto.setNombre(nombreRAAsignatura.get().getLiteral());
                    } else {
                        System.out.println("No se encontró ningún valor para el nombre.");
                        raAsignaturaDto.setNombre(raAsignaturaIndividual.getIRI().getShortForm()+"sin nombre");
                    }
                    
                    // :raTieneVerbo
                    OWLObjectProperty raTieneVerbo = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU+"raTieneVerbo"));
                    for (OWLNamedIndividual verboIndividual : reasonerOntoU.getObjectPropertyValues(raAsignaturaIndividual, raTieneVerbo).getFlattened()) {
                        VerboDto verboDto = new VerboDto();
                        verboDto.setId(verboIndividual.getIRI().getShortForm());
                        Optional<OWLLiteral> nombreVerbo = ontologyOntoU.getDataPropertyAssertionAxioms(verboIndividual)
                                    .stream()
                                    .filter(axiom -> axiom.getProperty().equals(nombrePropiedad))
                                    .map(OWLDataPropertyAssertionAxiom::getObject)
                                    .findFirst();
                        if (nombreVerbo.isPresent()) {
                            verboDto.setNombre(nombreVerbo.get().getLiteral());
                        } else {
                            verboDto.setNombre(verboIndividual.getIRI().getShortForm()+"sin nombre");
                        }

                        // :verboPerteneceANivel
                        OWLObjectProperty verboPerteneceANivel = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU+"verboPerteneceANivel"));
                        for (OWLNamedIndividual nivelIndividual : reasonerOntoU.getObjectPropertyValues(verboIndividual, verboPerteneceANivel).getFlattened()) {
                            verboDto.setNivel(nivelIndividual.getIRI().getShortForm());
                        }
                        raAsignaturaDto.setVerbo(verboDto);
                    }

                    raAsignaturaList.add(raAsignaturaDto);
                    
                }
                break;
            }
        }
        return raAsignaturaList;
    }

    // Método privado para obtener las Unidades de la asignatura.
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

    // Método privado para procesar la unidad.
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

    // Método privado para procesar el Tema.
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

    // Método privado para procesar el Topico.
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

    // Método para obtener los verbos de la OntoU.
    @CrossOrigin(origins = "http://localhost")
    @GetMapping("/getVerbos")
    public List<VerboDto> getVerbos() {
        List<VerboDto> listaVerboDtos = new ArrayList<>();
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();

        // Obtén la referencia a la clase 
        OWLClass verboClass = dataFactory.getOWLClass(IRI.create(baseOntoU+"Verbo"));

        // Obtener los individuos de la clase Verbo
        NodeSet<OWLNamedIndividual> individualsNodeSet = reasonerOntoU.getInstances(verboClass, false);

        // Recorrer los nodos e individuos
        for (Node<OWLNamedIndividual> node : individualsNodeSet) {
            for (OWLNamedIndividual verboIndividual : node.getEntities()) {
                VerboDto verboDto = new VerboDto();
                verboDto.setId(verboIndividual.getIRI().getShortForm());
                
                // Identificar la propiedad de datos (nombre)
                OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoU + "nombre"));

                Optional<OWLLiteral> nombreVerbo = ontologyOntoU.getDataPropertyAssertionAxioms(verboIndividual)
                                .stream()
                                .filter(axiom -> axiom.getProperty().equals(nombrePropiedad))
                                .map(OWLDataPropertyAssertionAxiom::getObject)
                                .findFirst();

                if (nombreVerbo.isPresent()) {
                    verboDto.setNombre(nombreVerbo.get().getLiteral());
                } 

                // :verboPerteneceANivel
                OWLObjectProperty verboPerteneceANivel = dataFactory.getOWLObjectProperty(IRI.create(baseOntoU+"verboPerteneceANivel"));
                for (OWLNamedIndividual nivelIndividual : reasonerOntoU.getObjectPropertyValues(verboIndividual, verboPerteneceANivel).getFlattened()) {
                    verboDto.setNivel(nivelIndividual.getIRI().getShortForm());
                }
                listaVerboDtos.add(verboDto);
            }
        }

        return listaVerboDtos;

    }

    // Método para obtener los metadatos automaticos
    @CrossOrigin(origins = "http://localhost")
    @GetMapping("/getInfoMetadatos")
    public List<String> getInfoMetadatos() {
        List<String> listaMetadatos= new ArrayList<>();
        OWLDataFactory dataFactory = OWLManager.getOWLDataFactory();

         // Obtener la clase Asignatura
         OWLClass asignaturaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "Asignatura"));

         // Obtener los individuos de la clase Asignatura
         Set<OWLNamedIndividual> individualsAsignatura = reasonerConocimiento.getInstances(asignaturaClass, false).getFlattened();
 
         // Propiedad de datos
         OWLDataProperty nombreProperty = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "nombre"));
         OWLDataProperty anioProperty = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "anio"));
 
         // Recorrer los individuos y obtener el valor de la propiedad "nombre"
         for (OWLNamedIndividual individualAsignatura : individualsAsignatura) {
             Set<OWLLiteral> dataValues = reasonerConocimiento.getDataPropertyValues(individualAsignatura, nombreProperty);
 
             System.out.println("Individuo: " + individualAsignatura.getIRI().getShortForm());
             for (OWLLiteral value : dataValues) {
                 System.out.println("Nombre: " + value.getLiteral());
                 listaMetadatos.add(value.getLiteral());
             }

             Set<OWLLiteral> anioAsignaturas = reasonerConocimiento.getDataPropertyValues(individualAsignatura, anioProperty);
 
             for (OWLLiteral anio : anioAsignaturas) {
                 System.out.println("Anio: " + anio.getLiteral());
                 listaMetadatos.add(anio.getLiteral());

             }
         }
        

        OWLClass raoaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ResultadoAprendizajeOA"));
        Set<OWLNamedIndividual> individualsRAOA = reasonerConocimiento.getInstances(raoaClass, false).getFlattened();
        
        String nombreOA= "";
        for (OWLNamedIndividual individualRAOA : individualsRAOA) {
            System.out.println("Individuo RAOA: " + individualRAOA.getIRI().getShortForm());
            OWLObjectProperty raTieneVerbo = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"raTieneVerbo"));
            for (OWLNamedIndividual verboIndividual : reasonerConocimiento.getObjectPropertyValues(individualRAOA, raTieneVerbo).getFlattened()) {
                System.out.println("Individuo Verbo: " + verboIndividual.getIRI().getShortForm());
                Set<OWLLiteral> dataValues = reasonerConocimiento.getDataPropertyValues(verboIndividual, nombreProperty);

                for (OWLLiteral value : dataValues) {
                    System.out.println("Nombre Verbo: " + value.getLiteral());
                    nombreOA = nombreOA + value.getLiteral() + " ";
                }
            }
            
        }


        // Obtener la clase Objeto
        OWLClass objetoClass = dataFactory.getOWLClass(IRI.create(baseIRI + "Objeto"));
        // Obtener los individuos de la clase Asignatura
        Set<OWLNamedIndividual> individualsObjeto = reasonerConocimiento.getInstances(objetoClass, false).getFlattened();
        // Recorrer los individuos y obtener el valor de la propiedad "nombre"
        for (OWLNamedIndividual individualObjeto : individualsObjeto) {
            Set<OWLLiteral> dataValues = reasonerConocimiento.getDataPropertyValues(individualObjeto, nombreProperty);

            System.out.println("Individuo Objeto: " + individualObjeto.getIRI().getShortForm());

            for (OWLLiteral value : dataValues) {
                System.out.println("Nombre: " + value.getLiteral());
                nombreOA = nombreOA + value.getLiteral() + " ";
            }
        }

        // Obtener la clase Condicion
        OWLClass condicionClass = dataFactory.getOWLClass(IRI.create(baseIRI + "Condicion"));
        Set<OWLNamedIndividual> individualsCondicion= reasonerConocimiento.getInstances(condicionClass, false).getFlattened();

        for (OWLNamedIndividual individualCondicion : individualsCondicion) {
            Set<OWLLiteral> dataValues = reasonerConocimiento.getDataPropertyValues(individualCondicion, nombreProperty);

            System.out.println("Individuo Condicion: " + individualCondicion.getIRI().getShortForm());

            for (OWLLiteral value : dataValues) {
                System.out.println("Nombre: " + value.getLiteral());
                nombreOA = nombreOA + value.getLiteral() + " ";
            }
        }
        
        listaMetadatos.add(nombreOA);

          // Obtener la clase Tema
          OWLClass temaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "Tema"));

          Set<OWLNamedIndividual> individualsTema = reasonerConocimiento.getInstances(temaClass, false).getFlattened();

          // Recorrer los individuos y obtener el valor de la propiedad "nombre"
          List<String> listaTemas= new ArrayList<>();
          for (OWLNamedIndividual individualTema : individualsTema) {
              Set<OWLLiteral> dataValues = reasonerConocimiento.getDataPropertyValues(individualTema, nombreProperty);
  
              System.out.println("Individuo Tema: " + individualTema.getIRI().getShortForm());

              for (OWLLiteral value : dataValues) {
                  System.out.println("Nombre: " + value.getLiteral());
                  listaTemas.add(value.getLiteral());
                  listaMetadatos.add(value.getLiteral());
              }
          }

        return listaMetadatos;

    }

    // Método para insertar los metadatos.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/insertMetadatos")
    public String insertMetadatos(@RequestParam String titulo, @RequestParam String lenguaje) {
        try {
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            OWLNamedIndividual generalIndividuo = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoLOM + "General" + oaid));
            OWLClass generalOwlClass = dataFactory.getOWLClass(IRI.create(baseOntoLOM  + "General"));

            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(generalOwlClass, generalIndividuo);

            manager.addAxiom(ontologyConocimiento, classAssertion);     
            
            // Crear un axioma titulo
            OWLDataProperty titlePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoLOM + "title"));
            OWLDataPropertyAssertionAxiom axiomTitle = dataFactory.getOWLDataPropertyAssertionAxiom(
                titlePropiedad, generalIndividuo, titulo
            );
            // Aplicar el cambio en la ontología
            manager.addAxiom(ontologyConocimiento, axiomTitle);

            // Crear un axioma language
            String lang = "";
            if (lenguaje.equals("Español")){
                lang = "es";
            }
            OWLDataProperty languagePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseOntoLOM + "language"));
            OWLDataPropertyAssertionAxiom axiomLanguage = dataFactory.getOWLDataPropertyAssertionAxiom(
                languagePropiedad, generalIndividuo, lang
            );
            // Aplicar el cambio en la ontología
            manager.addAxiom(ontologyConocimiento, axiomLanguage);
            
            manager.saveOntology(ontologyConocimiento);


            return "Metadato created successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create General Metadato. Error: " + e.getMessage();
        }
    }

    // Método para insertar un axiom en la ontologia.
    @PostMapping("/insertAxiom")
    public String insertAxiom(@RequestParam String individualName, 
                              @RequestParam String propertyName, 
                              @RequestParam String target) {
        try {
            // Create an individual
            OWLNamedIndividual individual = dataFactory.getOWLNamedIndividual(":" + individualName, pm);

            OWLEntity property = dataFactory.getOWLEntity(EntityType.OBJECT_PROPERTY, IRI.create(pm.getDefaultPrefix() + propertyName));
            
            if (property.isOWLObjectProperty()) {
                OWLObjectProperty objectProperty = property.asOWLObjectProperty();
                OWLNamedIndividual targetIndividual = dataFactory.getOWLNamedIndividual(":" + target, pm);

                OWLObjectPropertyAssertionAxiom axiom = dataFactory.getOWLObjectPropertyAssertionAxiom(objectProperty, individual, targetIndividual);

                manager.addAxiom(ontologyConocimiento, axiom);
                
            } else if (property.isOWLDataProperty()) {
                OWLDataProperty dataProperty = property.asOWLDataProperty();

                OWLLiteral literal = dataFactory.getOWLLiteral(target);

                OWLDataPropertyAssertionAxiom axiom = dataFactory.getOWLDataPropertyAssertionAxiom(dataProperty, individual, literal);

                manager.addAxiom(ontologyConocimiento, axiom);
            } else {
                return "Property type is not recognized.";
            }

            manager.saveOntology(ontologyConocimiento);

            return "Axiom successfully added to the ontology.";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error while inserting axiom: " + e.getMessage();
        }
    }

    // Método para crear un nuevo OA.
    @PostMapping("/createNewOA")
    public String createNewOA(@RequestParam String oaid) {
        try {
            //TODO implementar ver si ya esxiste el individuo para no hacer sincronizar.

            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            // Crear individuos basicos.
            OWLNamedIndividual oa = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "OA" + oaid));
            OWLNamedIndividual ra = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));
            OWLNamedIndividual evaluacion = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Evaluacion" + oaid));
            OWLNamedIndividual estructuraDeMetadato = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "EstructuraDeMetadato" + oaid));
            OWLNamedIndividual contenido = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion" + oaid));
            OWLNamedIndividual actividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Actividad" + oaid));

            // Definir las clases
            OWLClass oaClass = dataFactory.getOWLClass(IRI.create(baseIRI + "OA"));
            OWLClass raClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ResultadoAprendizajeOA"));
            OWLClass evaluacionClass = dataFactory.getOWLClass(IRI.create(baseIRI + "Evaluacion"));
            OWLClass estructuraDeMetadatoClass = dataFactory.getOWLClass(IRI.create(baseIRI + "EstructuraDeMetadato"));
            OWLClass contenidoClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ContenidoDeInstruccion"));
            OWLClass actividadClass = dataFactory.getOWLClass(IRI.create(baseIRI + "ActividadDeAprendizaje"));

            // Crear axioms
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(oaClass, oa));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(raClass, ra));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(evaluacionClass, evaluacion));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(estructuraDeMetadatoClass, estructuraDeMetadato));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(contenidoClass, contenido));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLClassAssertionAxiom(actividadClass, actividad));

            // Crear Object Properties
            OWLObjectProperty oaTieneComponente = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "oaTieneComponente"));

            // Crear relationships
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, ra));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, evaluacion));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, estructuraDeMetadato));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, contenido));
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(oaTieneComponente, oa, actividad));

            // Guardar
            manager.saveOntology(ontologyConocimiento);


            return "Individual '" + oaid + "' added to class 'OA' successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to insert individual '" + oaid + "' to class 'OA'. Error: " + e.getMessage();
        }
    }

    // Método para seleccionar un topico.
    @PostMapping("/linkTopicToOA")
    public String linkTopicToOA(@RequestParam String oaid, @RequestParam String idTopic) {
        try {
            // INSERT DATA {
            //     oaca:Contenido{$oaid} oaca:contenidoDesarrollaTopico  oaca:{$idTopico}.
            // }

            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            //Crear individuo Topico primero
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopic));
            OWLClass topicoOwlClass = dataFactory.getOWLClass(IRI.create(baseOntoT  + "Topico"));

            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(topicoOwlClass, topico);

            manager.addAxiom(ontologyConocimiento, classAssertion);     
            
            //TODO Setear el nombre al Topico 

            //Hacer la relacion con el ContenidoDeIstruccion(OAID)
            OWLNamedIndividual contenido = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion" + oaid));

            OWLObjectProperty contenidoDesarrollaTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "contenidoDeInstruccionDesarrollaTopico"));

            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(contenidoDesarrollaTopico, contenido, topico));

            manager.saveOntology(ontologyConocimiento);


            return "Topic linked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to link Topic. Error: " + e.getMessage();
        }
    }

    // Método para deseleccionar un topico.
    @PostMapping("/unlinkTopicToOA")
    public String unlinkTopicToOA(@RequestParam String oaid, @RequestParam String idTopic) {
        try {
            // DELETE DATA {
            //     oaca:Contenido{$oaid} oaca:contenidoDesarrollaTopico  oaca:{$idTopico}.
            // }

            
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            OWLNamedIndividual contenido = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion" + oaid));
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopic));

            OWLObjectProperty contenidoDesarrollaTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "contenidoDeInstruccionDesarrollaTopico"));

            OWLAxiom axiomToRemove = dataFactory.getOWLObjectPropertyAssertionAxiom(contenidoDesarrollaTopico, contenido, topico);

            manager.removeAxiom(ontologyConocimiento, axiomToRemove);


            //Eliminar individuo Topico 
            for (OWLAxiom axiom : ontologyConocimiento.getReferencingAxioms(topico)) {
                manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
            }

            //Eliminar el Episodio del Topico
            eliminarIndividuosPorCadena("_"+idTopic);

            manager.saveOntology(ontologyConocimiento);

            return "Topic unlinked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to unlink Topic. Error: " + e.getMessage();
        }
    }

    // Método privado para eliminar el episodio del Topico.
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

    // Método para crear la Unidad en el OA.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/insertUnidad")
    public String insertUnidad(@RequestParam String unidad) {
        try {
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            OWLNamedIndividual unidadIndividuo = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + unidad));
            OWLClass unidadOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Unidad"));

            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(unidadOwlClass, unidadIndividuo);

            manager.addAxiom(ontologyConocimiento, classAssertion);            

            //TODO hacer relacion con Asignatura/Contenido Minimo

            
            manager.saveOntology(ontologyConocimiento);

            return "Unidad created successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create Unidad. Error: " + e.getMessage();
        }
    }

    // Método para seleccionar RA de la Asignatura.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/linkRAAsignaturaToOA")
    public String linkRAAsignaturaToOA(@RequestParam String oaid, @RequestParam String idRAAsignatura) {
        try {
            
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            //Crear individuo RAAsignatura primero
            OWLNamedIndividual resultadoAprendizajeAsignatura = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + idRAAsignatura));
            OWLClass resultadoAprendizajeAsignaturaOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "ResultadoAprendizajeAsignatura"));

            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(resultadoAprendizajeAsignaturaOwlClass, resultadoAprendizajeAsignatura);
 
            manager.addAxiom(ontologyConocimiento, classAssertion);            

            //Hacer la relacion con el ResultadoAprendizajeOA(OAID)
            OWLNamedIndividual raOA = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));

            // Crear Object Properties
            OWLObjectProperty raOARefinaRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "raOARefinaRAAsignatura"));

            // Crear relaciones
            manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(raOARefinaRAAsignatura, raOA, resultadoAprendizajeAsignatura));


            // OntoU
            OWLOntologyManager managerOntologyOntoU = ontologyOntoU.getOWLOntologyManager();
            OWLDataFactory dataFactoryOntologyOntoU = managerOntologyOntoU.getOWLDataFactory();

            OWLNamedIndividual raAsignaturaIndividualOntoU = dataFactoryOntologyOntoU.getOWLNamedIndividual(IRI.create(baseOntoU + idRAAsignatura));
            
            // :raTieneVerbo
            OWLObjectProperty raTieneVerboOntoU = dataFactoryOntologyOntoU.getOWLObjectProperty(IRI.create(baseOntoU+"raTieneVerbo"));
            for (OWLNamedIndividual verboIndividualOntoU : reasonerOntoU.getObjectPropertyValues(raAsignaturaIndividualOntoU, raTieneVerboOntoU).getFlattened()) {
                //Crear Verbo
                OWLNamedIndividual verboIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + verboIndividualOntoU.getIRI().getShortForm()));
                OWLClass verboOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Verbo"));

                OWLClassAssertionAxiom classAssertionVerbo = dataFactory.getOWLClassAssertionAxiom(verboOwlClass, verboIndividual);
                
                manager.addAxiom(ontologyConocimiento, classAssertionVerbo);

                // Crear relaciones verbo y ra
                OWLObjectProperty raTieneVerbo = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"raTieneVerbo"));
                manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(raTieneVerbo, resultadoAprendizajeAsignatura, verboIndividual));


                // :verboPerteneceANivel
                OWLObjectProperty verboPerteneceANivelOntoU = dataFactoryOntologyOntoU.getOWLObjectProperty(IRI.create(baseOntoU+"verboPerteneceANivel"));
                for (OWLNamedIndividual nivelIndividualOntoU : reasonerOntoU.getObjectPropertyValues(verboIndividualOntoU, verboPerteneceANivelOntoU).getFlattened()) {
                    // Crear relaciones verbo y nivel
                    OWLObjectProperty verboPerteneceANivel = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"verboPerteneceANivel"));
                    OWLNamedIndividual nivelIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + nivelIndividualOntoU.getIRI().getShortForm()));
                    OWLClass nivelDominioCognitivoOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "NivelDominioCognitivo"));

                    OWLClassAssertionAxiom classAssertionNivel = dataFactory.getOWLClassAssertionAxiom(nivelDominioCognitivoOwlClass, nivelIndividual);
                    
                    manager.addAxiom(ontologyConocimiento, classAssertionNivel);

                    // Definir la propiedad de datos 'ordenTaxonomico'
                    OWLDataProperty ordenTaxonomicoPropiedad = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "ordenTaxonomico"));

                    int ordenTaxonomicoInt = 0; 
                    switch (nivelIndividualOntoU.getIRI().getShortForm()) {
                        case "Nivel1":
                            ordenTaxonomicoInt = 1; 
                            break;
                        case "Nivel2":
                            ordenTaxonomicoInt = 2; 
                            break;
                        case "Nivel3":
                            ordenTaxonomicoInt = 3; 
                            break;
                        default:
                            break;
                    }
                    // Crear un axioma de aserción de la propiedad de datos
                    OWLDataPropertyAssertionAxiom axiomOrdenTaxonomico = dataFactory.getOWLDataPropertyAssertionAxiom(
                        ordenTaxonomicoPropiedad, nivelIndividual, ordenTaxonomicoInt
                    );

                    // Aplicar el cambio en la ontología
                    manager.addAxiom(ontologyConocimiento, axiomOrdenTaxonomico);

                    manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(verboPerteneceANivel, verboIndividual, nivelIndividual));

                }
                
            }

            manager.saveOntology(ontologyConocimiento);


            return "RA linked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to link Topic. Error: " + e.getMessage();
        }
    }

    // Método para deseleccionar RA de la Asignatura.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/unlinkRAAsignaturaToOA")
    public String unlinkRAAsignaturaToOA(@RequestParam String oaid, @RequestParam String idRAAsignatura) {
        try {
            
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            OWLNamedIndividual resultadoAprendizajeAsignatura = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + idRAAsignatura));
            OWLNamedIndividual raOA = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));

            OWLObjectProperty raOARefinaRAAsignatura = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "raOARefinaRAAsignatura"));

            OWLAxiom axiomToRemove = dataFactory.getOWLObjectPropertyAssertionAxiom(raOARefinaRAAsignatura, raOA, resultadoAprendizajeAsignatura);

            manager.removeAxiom(ontologyConocimiento, axiomToRemove);

            //Eliminar individuo  
            for (OWLAxiom axiom : ontologyConocimiento.getReferencingAxioms(resultadoAprendizajeAsignatura)) {
                manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
            }

            manager.saveOntology(ontologyConocimiento);

            return "RA unlinked successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to unlink Topic. Error: " + e.getMessage();
        }
    }

    // Método para crear verbo con su nivel.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/createVerbo")
    public String createVerbo(@RequestParam String verboId, @RequestParam String verboNombre, @RequestParam String nivel) throws OWLOntologyStorageException {

        
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        //Crear individuo 
        OWLNamedIndividual verboIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + verboId));
        OWLClass verboOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Verbo"));

        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(verboOwlClass, verboIndividual);

        manager.addAxiom(ontologyConocimiento, classAssertion);

        // Crear relaciones verbo y nivel
        OWLObjectProperty verboPerteneceANivel = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"verboPerteneceANivel"));
        OWLNamedIndividual nivelIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + nivel));
        OWLClass nivelDominioCognitivoOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "NivelDominioCognitivo"));

        OWLClassAssertionAxiom classAssertionNivel = dataFactory.getOWLClassAssertionAxiom(nivelDominioCognitivoOwlClass, nivelIndividual);
        
        manager.addAxiom(ontologyConocimiento, classAssertionNivel);

        // Definir la propiedad de datos 'ordenTaxonomico'
        OWLDataProperty ordenTaxonomicoPropiedad = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "ordenTaxonomico"));

        int ordenTaxonomicoInt = 0; 
        switch (nivel) {
            case "Nivel1":
                ordenTaxonomicoInt = 1; 
                break;
            case "Nivel2":
                ordenTaxonomicoInt = 2; 
                break;
            case "Nivel3":
                ordenTaxonomicoInt = 3; 
                break;
            default:
                break;
        }
        // Crear un axioma de aserción de la propiedad de datos
        OWLDataPropertyAssertionAxiom axiomOrdenTaxonomico = dataFactory.getOWLDataPropertyAssertionAxiom(
            ordenTaxonomicoPropiedad, nivelIndividual, ordenTaxonomicoInt
        );

        // Aplicar el cambio en la ontología
        manager.addAxiom(ontologyConocimiento, axiomOrdenTaxonomico);


        // Crear un axioma Nombre
        OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "nombre"));
        OWLDataPropertyAssertionAxiom axiomNombreVerbo = dataFactory.getOWLDataPropertyAssertionAxiom(
            nombrePropiedad, verboIndividual, verboNombre
        );

        // Aplicar el cambio en la ontología
        manager.addAxiom(ontologyConocimiento, axiomNombreVerbo);
        
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(verboPerteneceANivel, verboIndividual, nivelIndividual));

        // Crear relaciones verbo y raOA
        OWLObjectProperty raTieneVerbo = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"raTieneVerbo"));
        OWLNamedIndividual raOAIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));

        // Obtener las aserciones de propiedades de objeto que refieren al individuo "raOAIndividual"
        for (OWLObjectPropertyAssertionAxiom axiom : ontologyConocimiento.getObjectPropertyAssertionAxioms(raOAIndividual)) {
            // Verificar si la propiedad es "raTieneVerbo"
            if (axiom.getProperty().equals(raTieneVerbo)) {
                // Aplicar el cambio para eliminar el axioma
                manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
            }
        }

        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(raTieneVerbo, raOAIndividual, verboIndividual));

        manager.saveOntology(ontologyConocimiento);


        return "Successfully created Verb";

    }

    // Método para crear objeto.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/createObjeto")
    public String createObjeto(@RequestParam String objeto) throws OWLOntologyStorageException {

        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        //Crear individuo  
        OWLNamedIndividual objetoIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Objeto"+oaid));
        OWLClass objetoOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Objeto"));

        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(objetoOwlClass, objetoIndividual);

        manager.addAxiom(ontologyConocimiento, classAssertion);

        // Crear relaciones verbo y raOA
        OWLObjectProperty raTieneObjeto = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"raTieneObjeto"));
        OWLNamedIndividual raOAIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(raTieneObjeto, raOAIndividual, objetoIndividual));

        // Crear un axioma Nombre
        OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "nombre"));
        OWLDataPropertyAssertionAxiom axiomNombre = dataFactory.getOWLDataPropertyAssertionAxiom(
            nombrePropiedad, objetoIndividual, objeto
        );

        // Aplicar el cambio en la ontología
        manager.addAxiom(ontologyConocimiento, axiomNombre);

        manager.saveOntology(ontologyConocimiento);

        return "Successfully created Objeto";
    }

    // Método para crear condicion.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/createCondicion")
    public String createCondicion(@RequestParam String condicion) throws OWLOntologyStorageException {

        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        //Crear individuo 
        OWLNamedIndividual condicionIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Condicion"+oaid));
        OWLClass condicionOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Condicion"));

        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(condicionOwlClass, condicionIndividual);

        manager.addAxiom(ontologyConocimiento, classAssertion);

        // Crear relaciones verbo y raOA
        OWLObjectProperty raTieneCondicion = dataFactory.getOWLObjectProperty(IRI.create(baseIRI+"raTieneCondicion"));
        OWLNamedIndividual raOAIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ResultadoAprendizajeOA" + oaid));
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(raTieneCondicion, raOAIndividual, condicionIndividual));

        // Crear un axioma Nombre
        OWLDataProperty nombrePropiedad = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "nombre"));
        OWLDataPropertyAssertionAxiom axiomNombre = dataFactory.getOWLDataPropertyAssertionAxiom(
            nombrePropiedad, condicionIndividual, condicion
        );

        // Aplicar el cambio en la ontología
        manager.addAxiom(ontologyConocimiento, axiomNombre);

        manager.saveOntology(ontologyConocimiento);


        return "Successfully created Condicion";

    }

    // Método para crear las relaciones entre temas y topicos, niveles.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/createTopicsRelations")
    public String createTopicsRelations(@RequestBody List<NodeDto> nodes) throws OWLOntologyStorageException {
        
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();
        
        for (NodeDto node : nodes) {
            String temaId = node.getId();
            processNode(node, 0, null, manager, dataFactory, temaId);  // Nivel inicial 0
        }

        return "Nodes processed successfully";
    }

    // Método recursivo para procesar nodos y sus hijos
    private void processNode(NodeDto node, int level, String parent, OWLOntologyManager manager, OWLDataFactory dataFactory, String temaId) throws OWLOntologyStorageException {
        // Procesar el nodo actual
        System.out.println("Node Name: " + node.getNombre() + ", Level: " + level+", Node Parent: " + parent+", Node relation: " + node.getRelation());

        // Definir las propiedades de objeto de Tema
        OWLObjectProperty temaContieneTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "temaContieneTopico"));
        OWLObjectProperty temaContieneTopicoSoporte = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "temaContieneTopicoSoporte"));

        if (level == 0) {//es un Tema
            
            //Crear individuo Tema 
            OWLNamedIndividual tema = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + node.getId()));
            OWLClass temaOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Tema"));

            OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(temaOwlClass, tema);

            manager.addAxiom(ontologyConocimiento, classAssertion); 

            // Identificar la propiedad de datos (nombre)
            OWLDataProperty nombrePropiedadBaseIRI = dataFactory.getOWLDataProperty(IRI.create(baseIRI + "nombre"));

            // Crear un axioma de aserción de la propiedad de datos
            OWLDataPropertyAssertionAxiom axiomNombreTema = dataFactory.getOWLDataPropertyAssertionAxiom(
                nombrePropiedadBaseIRI, tema, node.getNombre()
            );

            // Aplicar el cambio en la ontología
            manager.addAxiom(ontologyConocimiento, axiomNombreTema);
            
            // Obtener las aserciones de propiedades de objeto que refieren al individuo "tema"
            for (OWLObjectPropertyAssertionAxiom axiom : ontologyConocimiento.getObjectPropertyAssertionAxioms(tema)) {
                // Verificar si la propiedad es "temaContieneTopico" o "temaContieneTopicoSoporte"
                if (axiom.getProperty().equals(temaContieneTopico) || axiom.getProperty().equals(temaContieneTopicoSoporte)) {
                    // Aplicar el cambio para eliminar el axioma
                    manager.applyChange(new RemoveAxiom(ontologyConocimiento, axiom));
                }
            }

            manager.saveOntology(ontologyConocimiento);
        }
        else{//Es un Topico
            OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + node.getId()));
            OWLObjectProperty topicoPerteneceATema = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "topicoPerteneceATema"));

            //Crear individuo EpisodioDeAprendizaje 
            OWLNamedIndividual episodioDeAprendizaje = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI +"EpisodioDeAprendizaje_" + node.getId()));
            OWLClass episodioDeAprendizajeOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "EpisodioDeAprendizaje"));
            
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
                    OWLNamedIndividual episodioSoporte = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI +"EpisodioSoporte_" + node.getId()));
                    OWLClass episodioSoportejeOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "EpisodioSoporte"));
                    
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
                processNode(child, level + 1, node.getId(), manager, dataFactory, temaId);
            }
        }
    }

    // Método para definir el orden de desarrollo de los topicos.
    @CrossOrigin(origins = "http://localhost")
    @PostMapping("/setOrdenDeDesarrollo")
    public String setOrdenDeDesarrollo(@RequestBody List<String> topicos) {
        try {
            
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory dataFactory = manager.getOWLDataFactory();

            // Iterar sobre los nombres de los tópicos en el array
            for (int i = 0; i < topicos.size(); i++) {
                String idTopico = topicos.get(i);
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

    // Método para analizar el contenido de un Multiple Choice y obtener las preguntas
    @PostMapping("/analyzeMultiChoiceAnalyzer")
    public List<Question> analyzeMultiChoiceAnalyzer(@RequestBody JsonNode jsonNode) throws Exception {
        List<Question> questions = new ArrayList<>();

        MultiChoiceAnalyzer.analyze(jsonNode, questions);

        return questions; // Retornamos la lista de preguntas procesadas
    }

    // Método para analizar el contenido de un Single Choice y obtener las preguntas
    @PostMapping("/analyzeSingleChoiceAnalyzer")
    public List<Question> analyzeSingleChoiceAnalyzer(@RequestBody JsonNode jsonNode) throws Exception {
        List<Question> questions = new ArrayList<>();

        SingleChoiceAnalyzer.analyze(jsonNode, questions);

        return questions; // Retornamos la lista de preguntas procesadas
    }

    // Método para analizar el contenido de un Course Presentation
    @PostMapping("/analyzeCoursePresentation")
    public List<Slide> analyzeCoursePresentation(@RequestBody JsonNode jsonNode) throws Exception {
        JsonNode coursePresentationNode = jsonNode.get("params").get("presentation").get("slides");

        List<Slide> slides = new ArrayList<>();
        var elementId = 1;
        for (JsonNode slideNode : coursePresentationNode) {
            Slide slide = new Slide();
            List<Element> elements = new ArrayList<>();
            
            // Recorrer los elementos dentro de cada diapositiva
            if(slideNode.has("elements")){
                for (JsonNode elementNode : slideNode.get("elements")) {
                    Element element = new Element();
                    element.setId(elementId);
                    elementId++;
                    String library = elementNode.get("action").get("library").asText();
                    JsonNode params = elementNode.get("action").get("params");
                    
                    element.setLibrary(library);

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
    
                            MultiChoiceAnalyzer.analyze(elementNode.get("action"), questions);
                            element.setParams(questions);
                            break;

                        case "H5P.Video 1.6":
                            element.setType("Video");
                            break;
                        
                        case "H5P.Link 1.3":
                            element.setType("Link");
                            break;
                        
                    }
                    
                    elements.add(element);
                }
            }
            
            
            slide.setElements(elements);
            slides.add(slide);
        }
        

        return slides;
    }

    // Método para crear una Subactividad en el OA.
    @PostMapping("/insertSubactividad")
    public String insertSubactividad(@RequestParam String idSubact, @RequestParam String oaid,  @RequestParam String idTopico,
     @RequestBody JsonNode jsonNode, @RequestParam String library) throws Exception {

        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        OWLNamedIndividual subactividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Subactividad_"+idSubact));
        OWLClass subactividadOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Subactividad"));
        
        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(subactividadOwlClass, subactividad);

        manager.addAxiom(ontologyConocimiento, classAssertion);

        OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopico));

        // Crear Object Properties
        OWLObjectProperty subactividadAyudaAComprenderTopico = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "subactividadAyudaAComprenderTopico"));

        // Crear relaciones
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(subactividadAyudaAComprenderTopico, subactividad, topico));

        //:actividadSeComponeDeSubactividad
        OWLNamedIndividual actividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Actividad"+ oaid));

        // Crear Object Properties
        OWLObjectProperty actividadSeComponeDeSubactividad = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "actividadSeComponeDeSubactividad"));

        // Crear relaciones
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(actividadSeComponeDeSubactividad, actividad, subactividad));


        switch (library) {
            case "H5P.AdvancedText 1.1":
                Element elementText = new Element();
                elementText.setId(1);
                elementText.setType("Text");
                crearTipoActividad(elementText, idSubact);
                break;
                
            case "H5P.Image 1.1":
                
                break;
                
            case "H5P.MultiChoice 1.16":
                List<Question> questions = new ArrayList<>();
                // Llamamos al método de análisis que ya tienes
                MultiChoiceAnalyzer.analyze(jsonNode, questions);
                Element elementMC = new Element();
                elementMC.setId(1);
                elementMC.setType("MultiChoice");
                elementMC.setParams(questions);
                crearTipoActividad(elementMC, idSubact);
                break;

            case "H5P.Video 1.6":
                Element elementVideo = new Element();
                elementVideo.setId(1);
                elementVideo.setType("Video");
                crearTipoActividad(elementVideo, idSubact);
                break;

            case "H5P.CoursePresentation 1.25":
                System.out.println("insideeee");
                List<Slide> slides = analyzeCoursePresentation(jsonNode);
                
                for(Slide slide: slides){
                    for(Element elementCP: slide.getElements()){
                        System.out.println("Crear TipoActividad:");
                        System.out.println(elementCP.getType());
                        crearTipoActividad(elementCP, idSubact);
                    }
                }
                
                break;  
            
                
        }

        manager.saveOntology(ontologyConocimiento);
        return "Created Actividad con Exito";

    }

    // Método privado para crear el tipo de Actividad de la subactividad.
    private void crearTipoActividad(Element element, String idSubact) {
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();
        OWLNamedIndividual subactividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Subactividad_"+idSubact));

        // Crear Object Properties
        OWLObjectProperty subactividadUtilizaTipoActividad = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "subactividadUtilizaTipoActividad"));

        OWLClassAssertionAxiom classAssertion;
        int elementId = element.getId();
        switch (element.getType()) {
            case "MultiChoice":
                OWLNamedIndividual multipleOpcionActividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "MultipleOpcionActividad_"+idSubact+"_"+elementId));
                OWLClass multipleOpcionActividadOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "MultipleOpcionActividad"));
                
                classAssertion = dataFactory.getOWLClassAssertionAxiom(multipleOpcionActividadOwlClass, multipleOpcionActividad);

                manager.addAxiom(ontologyConocimiento, classAssertion);

                // Crear relaciones
                manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(subactividadUtilizaTipoActividad, subactividad, multipleOpcionActividad));

                break;
            
            case "Video":
                OWLNamedIndividual verVideoActividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "VerVideoActividad_"+idSubact+"_"+elementId));
                OWLClass verVideoActividadOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "VerVideoActividad"));
                
                classAssertion = dataFactory.getOWLClassAssertionAxiom(verVideoActividadOwlClass, verVideoActividad);

                manager.addAxiom(ontologyConocimiento, classAssertion);

                // Crear relaciones
                manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(subactividadUtilizaTipoActividad, subactividad, verVideoActividad));

                break;
            
            case "Text":
                OWLNamedIndividual lecturaActividad = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "LecturaActividad_"+idSubact+"_"+elementId));
                OWLClass lecturaActividadOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "LecturaActividad"));
                
                classAssertion = dataFactory.getOWLClassAssertionAxiom(lecturaActividadOwlClass, lecturaActividad);

                manager.addAxiom(ontologyConocimiento, classAssertion);

                // Crear relaciones
                manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(subactividadUtilizaTipoActividad, subactividad, lecturaActividad));

                break;
        
            default:
                break;
            
            
        }
    }

    
    // Método para crear Ejemplo en el OA.
    @PostMapping("/insertEjemplo")
    public String insertEjemplo(@RequestParam String idEjemplo, @RequestParam String idTopico) throws OWLOntologyStorageException {
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        OWLNamedIndividual ejemplo = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + "Ejemplo_"+idEjemplo+"_"+idTopico));
        OWLClass ejemploOwlClass = dataFactory.getOWLClass(IRI.create(baseOntoT  + "Ejemplo"));
        
        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(ejemploOwlClass, ejemplo);

        manager.addAxiom(ontologyConocimiento, classAssertion);

        //Hacer la relacion con el Topico
        OWLNamedIndividual topico = dataFactory.getOWLNamedIndividual(IRI.create(baseOntoT + idTopico));

        // Crear Object Properties
        OWLObjectProperty ejemploEsDeTopico = dataFactory.getOWLObjectProperty(IRI.create(baseOntoT + "ejemploEsDeTopico"));

        // Crear relaciones
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(ejemploEsDeTopico, ejemplo, topico));

        manager.saveOntology(ontologyConocimiento);
        return "inserted Ejemplo successfully";

    }

    // Método para crear Contenido en el OA.
    @PostMapping("/insertContenido")
    public String insertContenido(@RequestParam String idContenido, @RequestParam String oaid, @RequestParam String library, @RequestBody JsonNode jsonNode) throws Exception {
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();

        switch (library) {
            case "H5P.Video 1.6":
            // 1 boton por el play
                createBoton(oaid, idContenido, 1);
                break;

            case "H5P.CoursePresentation 1.25":
                //2 botones mover diapositiva(<>)
                createBoton(oaid, idContenido, 1);
                createBoton(oaid, idContenido, 2);
                List<Slide> slides = analyzeCoursePresentation(jsonNode);
                int id_boton = 3;
                for(Slide slide: slides){
                    for(Element elementCP: slide.getElements()){
                        switch (elementCP.getType()) {
                            case "MultiChoice":
                                break;
                            case "Video":
                                // 1 boton
                                createBoton(oaid, idContenido, id_boton);
                                id_boton++;
                                break;
                            case "Link":
                                createBoton(oaid, idContenido, id_boton);
                                id_boton++;
                                break;
                            default:
                                break;
                        }
                        
                    }
                }
                
                break;    
        }

        manager.saveOntology(ontologyConocimiento);
        return "inserted Contenido successfully";

    }

    // Método para crear Evaluacion en el OA.
    @PostMapping("/insertEvaluacion")
    public String insertEvaluacion(@RequestParam String idEvaluacion, @RequestParam String oaid, @RequestParam String library, @RequestBody JsonNode jsonNode) throws Exception {
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();

        switch (library) {
            case "H5P.MultiChoice 1.16":
            // OntoOA:MultipleOpcionInstrumento
                createInstrumentoEvaluacion(idEvaluacion, oaid, "MultipleOpcionInstrumento");
                break;

            case "H5P.Crossword 0.5":
            // OntoOA:CrucigramaInstrumento
                createInstrumentoEvaluacion(idEvaluacion, oaid, "CrucigramaInstrumento");
                break;  
            
            case "H5P.SingleChoiceSet 1.11":
            // OntoOA:SimpleOpcionInstrumento
                createInstrumentoEvaluacion(idEvaluacion, oaid, "SimpleOpcionInstrumento");
                break; 

            case "H5P.Questionnaire 1.3":
                // OntoOA:GuiaDePreguntasInstrumento
                createInstrumentoEvaluacion(idEvaluacion, oaid, "GuiaDePreguntasInstrumento");
                break; 

            case "H5P.Essay 1.5":
                // OntoOA:EnsayoInstrumento
                createInstrumentoEvaluacion(idEvaluacion, oaid, "EnsayoInstrumento");
                break; 
                
        }

        manager.saveOntology(ontologyConocimiento);
        return "inserted Contenido successfully";


    }

    // Método privado para crear instrumento evaluacion
    private void createInstrumentoEvaluacion(String idEvaluacion, String oaid, String classInstrumento) {
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        OWLNamedIndividual instrumentoIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI+classInstrumento+idEvaluacion));
        OWLClass instrumentoOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + classInstrumento));
        
        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(instrumentoOwlClass, instrumentoIndividual);
        manager.addAxiom(ontologyConocimiento, classAssertion);

        OWLNamedIndividual evaluacionIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "Evaluacion"+oaid));
        // Crear Object Properties
        OWLObjectProperty evaluacionUtilizaInstrumento = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "evaluacionUtilizaInstrumento"));
        // Crear relaciones
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(evaluacionUtilizaInstrumento, evaluacionIndividual, instrumentoIndividual));
       
    }

    // Método privado para crear un elemento Boton en el OA.
    private void createBoton(String oaid2, String idContenido, int id) {
        OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
        OWLDataFactory dataFactory = manager.getOWLDataFactory();

        
        OWLNamedIndividual botonIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI+ "Boton_OA"+oaid+"_Contenido"+idContenido+"ID_"+id));
        OWLClass ejemploOwlClass = dataFactory.getOWLClass(IRI.create(baseIRI  + "Boton"));
        
        OWLClassAssertionAxiom classAssertion = dataFactory.getOWLClassAssertionAxiom(ejemploOwlClass, botonIndividual);
        manager.addAxiom(ontologyConocimiento, classAssertion);

        
        OWLNamedIndividual contenidoDeInstruccionIndividual = dataFactory.getOWLNamedIndividual(IRI.create(baseIRI + "ContenidoDeInstruccion"+oaid));
        // Crear Object Properties
        OWLObjectProperty contenidoTieneElementoDeInteraccion = dataFactory.getOWLObjectProperty(IRI.create(baseIRI + "contenidoTieneElementoDeInteraccion"));
        // Crear relaciones
        manager.addAxiom(ontologyConocimiento, dataFactory.getOWLObjectPropertyAssertionAxiom(contenidoTieneElementoDeInteraccion, contenidoDeInstruccionIndividual, botonIndividual));
        
    }

    // Método para insertar un individuo de una clase.
    @PostMapping("/insertIndividual")
    public String insertIndividual(@RequestParam String individualName, @RequestParam String className) {
        try {
            OWLOntologyManager manager = ontologyConocimiento.getOWLOntologyManager();
            OWLDataFactory factory = manager.getOWLDataFactory();

            OWLNamedIndividual individual = factory.getOWLNamedIndividual(IRI.create(baseIRI + individualName));
            OWLClass owlClass = factory.getOWLClass(IRI.create(baseIRI  + className));

            OWLClassAssertionAxiom classAssertion = factory.getOWLClassAssertionAxiom(owlClass, individual);

            manager.addAxiom(ontologyConocimiento, classAssertion);

            manager.saveOntology(ontologyConocimiento);

            return "Individual '" + individualName + "' added to class '" + className + "' successfully.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to insert individual '" + individualName + "' to class '" + className + "'. Error: " + e.getMessage();
        }
    }

    // Método para que el razonador se sincronice.
    @CrossOrigin(origins = "http://localhost")
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

    // Método para procesar el CSV creado luego de procesar los pdf.
    @PostMapping("/procesarCSV")
    public void procesarCSV(@RequestParam String  filePath) {
        OWLOntologyManager managerOntologyOntoU = ontologyOntoU.getOWLOntologyManager();
        // OWLDataFactory dataFactoryOntologyOntoU = managerOntologyOntoU.getOWLDataFactory();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] datos = line.split(";");
                System.out.println(datos);
                String individuo = datos[0].trim();
                String clase = datos[1].trim();
                String objectProperty = datos[2].trim();
                String objeto = datos[3].trim();
                String dataProperty = datos[4].trim();
                String valor = datos[5].trim();

                // Crear individuo y asignar clase si aún no existe
                crearIndividuo(individuo, clase);

                // Agregar cada Object Property encontrada
                if (!objectProperty.isEmpty() && !objeto.isEmpty()) {
                    agregarObjectProperty(individuo, objectProperty, objeto);
                }

                // // Agregar cada Data Property encontrada
                if (!dataProperty.isEmpty() && !valor.isEmpty()) {
                    agregarDataProperty(individuo, dataProperty, valor);
                }

                // Save the ontology after adding the axiom
                managerOntologyOntoU.saveOntology(ontologyOntoU);
            }
            } catch (Exception e) {
                e.printStackTrace();
            }
    }

    // Método para crear individuo de la clase
    public void crearIndividuo(String individuoNombre, String claseNombre) {
        OWLOntologyManager managerOntologyOntoU = ontologyOntoU.getOWLOntologyManager();
        OWLDataFactory dataFactoryOntologyOntoU = managerOntologyOntoU.getOWLDataFactory();
        // Crear OWLNamedIndividual
        OWLNamedIndividual individuo = dataFactoryOntologyOntoU.getOWLNamedIndividual(IRI.create(baseOntoU  + individuoNombre));
    
        // Crear OWLClass
        OWLClass clase = dataFactoryOntologyOntoU.getOWLClass(IRI.create(baseOntoU  + claseNombre));
    
        // Asociar el individuo a la clase
        OWLClassAssertionAxiom axiom = dataFactoryOntologyOntoU.getOWLClassAssertionAxiom(clase, individuo);
        manager.addAxiom(ontologyOntoU, axiom);
    }

    // Método para agregar Object Property
    public void agregarObjectProperty(String sujeto, String propiedad, String objeto) {
        OWLOntologyManager managerOntologyOntoU = ontologyOntoU.getOWLOntologyManager();
        OWLDataFactory dataFactoryOntologyOntoU = managerOntologyOntoU.getOWLDataFactory();

        OWLNamedIndividual sujetoInd = dataFactoryOntologyOntoU.getOWLNamedIndividual(IRI.create(baseOntoU+ sujeto));
        OWLNamedIndividual objetoInd = dataFactoryOntologyOntoU.getOWLNamedIndividual(IRI.create(baseOntoU + objeto));
        OWLObjectProperty objProp = dataFactoryOntologyOntoU.getOWLObjectProperty(IRI.create(baseOntoU + propiedad));
    
        // Crear la relación
        OWLObjectPropertyAssertionAxiom axiom = dataFactoryOntologyOntoU.getOWLObjectPropertyAssertionAxiom(objProp, sujetoInd, objetoInd);
        manager.addAxiom(ontologyOntoU, axiom);
    }

    // Método para agregar Data Property
    public void agregarDataProperty(String sujeto, String propiedad, String valor) {
        OWLOntologyManager managerOntologyOntoU = ontologyOntoU.getOWLOntologyManager();
        OWLDataFactory dataFactoryOntologyOntoU = managerOntologyOntoU.getOWLDataFactory();
        OWLNamedIndividual sujetoInd = dataFactoryOntologyOntoU.getOWLNamedIndividual(IRI.create(baseOntoU + sujeto));
        OWLDataProperty dataProp = dataFactoryOntologyOntoU.getOWLDataProperty(IRI.create(baseOntoU + propiedad));
    
        // Crear valor literal
        OWLLiteral literal = dataFactoryOntologyOntoU.getOWLLiteral(valor);
    
        // Crear la relación
        OWLDataPropertyAssertionAxiom axiom = dataFactoryOntologyOntoU.getOWLDataPropertyAssertionAxiom(dataProp, sujetoInd, literal);
        manager.addAxiom(ontologyOntoU, axiom);
    }

}

