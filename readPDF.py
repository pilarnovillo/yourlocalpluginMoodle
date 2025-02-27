import PyPDF2
import re
import spacy


# Abre el archivo PDF desde el que deseas extraer texto
with open('C:\\Users\\piluc\\OneDrive\\Documentos\\Proyecto Final\\input SR\\ORD 1877 ISI - DC.pdf','rb') as file:
    pdf = PyPDF2.PdfReader(file)

    # Inicializa una cadena vacía para almacenar el texto extraído
    texto_extraido = ''
    # Itera a través de cada página del PDF y extrae el texto
    parts = []
    for page_num in range(len(pdf.pages)):
        page = pdf.pages[page_num]
        
        def visitor_body(text, cm, tm, fontDict, fontSize):
            y = tm[5]
            if y > 40 and y < 710:
                parts.append(text)
        page.extract_text(visitor_text=visitor_body)
        
    texto_extraido = "".join(parts)

# Abre el archivo PDF desde el que deseas extraer texto
with open('C:\\Users\\piluc\\OneDrive\\Documentos\\Proyecto Final\\input SR\\Planificación AMI 2023_ Anual.pdf','rb') as file:
    pdf_catedra = PyPDF2.PdfReader(file)

    # Inicializa una cadena vacía para almacenar el texto extraído
    texto_extraido_catedra = ''
    # Itera a través de cada página del PDF y extrae el texto
    parts_catedra = []
    for page_num in range(len(pdf_catedra.pages)):
        page = pdf_catedra.pages[page_num]
        
        def visitor_body(text, cm, tm, fontDict, fontSize):
            y = tm[5]
            if y > 0 and y < 750:
                parts_catedra.append(text)
        page.extract_text(visitor_text=visitor_body)
        
    texto_extraido_catedra = "".join(parts_catedra)

    # Limpiar texto
    texto_extraido_catedra = texto_extraido_catedra.replace("Universidad Tecnológica Nacional  Facultad Regional Santa Fe  Secretaría Académica / Departamento Materias Básicas", '')


import os
from datetime import datetime

# Ruta de la carpeta donde se creará el archivo
folder_path = r'C:\\Users\\piluc\\OneDrive\\Documentos\\Proyecto Final\\'

# Obtener la fecha y hora actual
current_datetime = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")

# Concatenar la fecha y hora al nombre del archivo
filename = os.path.join(folder_path, f"salida_{current_datetime}.txt")

# Escribir en el archivo
with open(filename, 'w', encoding="utf-8") as file:

    file.write(f"Individuo;Clase;ObjectProperty;Objeto;DataProperty;Valor")
    file.write("\n")    

    # Divide el texto en líneas, elimina las líneas en blanco y vuelve a unir las líneas restantes
    texto_extraido_procesado = "\n".join(linea for linea in texto_extraido.splitlines() if linea.strip())

    # Expresión regular para extraer el nombre de la carrera de ingeniería
    patron_carrera = r"carrera\s+(Ingeniería\s+\w+(?:\s+\w+)*)\s+en\s+el\s+ámbito"

    # Busca la primer coincidencia en el texto
    carrera = re.search(patron_carrera, texto_extraido_procesado).group(1)

    idCarrera= re.sub(r'[^a-zA-Z0-9]', '', carrera) 
    file.write(f"{idCarrera};Carrera;;;nombre;{carrera}")
    file.write("\n")

    # Expresión regular para extraer el nombre de la universidad
    patron_universidad = r"(Universidad(.*)),"

    # Busca la primer coincidencia en el texto
    universidad = re.search(patron_universidad, texto_extraido_procesado).group(1)

    idUniversidad= re.sub(r'[^a-zA-Z0-9]', '', universidad) 
    file.write(f"{idUniversidad};Universidad;;;nombre;{universidad}")
    file.write("\n")

    # Expresión regular para extraer los nombres de las asignaturas
    patron_asignaturas = r'^\d+\s+(.+?(\n.+?\s+)?)\s+\d+\s+\d+\s+\d+'

    # Busca todas las coincidencias en el texto
    nombres_asignaturas = re.findall(patron_asignaturas, texto_extraido_procesado, re.MULTILINE)
    
    for nombre in nombres_asignaturas:
        print(nombre[0].replace('\n', ''))

    # Expresión regular para extraer los contenidos mínimos
    patron_contenido_minimos = r"(Contenidos mínimos(.*?)(Carrera:|9- EVALUACI))+"

    contenido_minimos = re.findall(patron_contenido_minimos, texto_extraido_procesado, re.DOTALL)
    

    for materia, contenidos in enumerate(contenido_minimos):
        print("Materia: "+ nombres_asignaturas[materia][0])
        print(contenidos[0].replace('Contenidos mínimos', '').replace('Carrera:', '')) # TODO limpiar para que solo queden los -
        print("--------------------------------------")

    # Expresión regular para extraer las Competencias Tecnológicas
    patron_competencias_tecnologicas = r"(Competencias Tecnológicas(.*?))Competencias Sociales Políticas y Actitudinales"
   
    competencias_tecnologicas = re.findall(patron_competencias_tecnologicas, texto_extraido_procesado, re.DOTALL)
    
    for competencias in competencias_tecnologicas:
        print(competencias[0])
        print("--------------------------------------")

        

    # Expresión regular para extraer las Competencias Sociales Políticas y Actitudinales
    patron_competencias_sociales = r"(Competencias Sociales Políticas y Actitudinales(.*?))Competencias Específicas"
    
    competencias_sociales = re.findall(patron_competencias_sociales, texto_extraido_procesado, re.DOTALL)
    
    for competencias in competencias_sociales:
        print(competencias[0])
        print("--------------------------------------")


    # Expresión regular para extraer las Competencias Específicas
    patron_competencias_especificas = r"CE\d\.\d:\s(.*?)(?=\.\s+\n)"
   
    competencias_especificas = re.findall(patron_competencias_especificas, texto_extraido_procesado,  re.DOTALL)
    
    # Imprime el contenido mínimo encontrado
    for competencias in competencias_especificas:
        print(competencias)
        print("--------------------------------------")



# PLAN DE CATEDRA
    
    # Regex para extraer el texto después de "Asignatura:" y antes del salto de línea
    pattern = r'Asignatura:\s*(.*)'

    # Buscar todas las coincidencias en el texto
    resultados = re.findall(pattern, texto_extraido_catedra)

    # Imprimir los resultados
    for resultado in resultados:
        idAsignatura = re.sub(r'[^a-zA-Z0-9]', '', resultado) 
        file.write(f"{idAsignatura};Asignatura;;;nombre;{resultado}")
        file.write("\n")
        # Expresión regular para extraer los contenidos mínimos
        patron_contenido_minimos = r"(Contenidos mínimos(.*?)(Carrera:|9- EVALUACI))+"

        contenido_minimos = re.findall(patron_contenido_minimos, texto_extraido_procesado, re.DOTALL)
        
        # Imprime el contenido mínimo encontrado
        for materia, contenidos in enumerate(contenido_minimos):
            if(nombres_asignaturas[materia][0].strip() == resultado.strip()):
                contenidos_minimos_separados = re.split(r'\.\s+', contenidos[0].replace('Contenidos mínimos', '').replace('Carrera:', ''))
                for idCM, contenido in enumerate(contenidos_minimos_separados, start=1):
                    contenido_limpio = contenido.replace('\n', '')
                    file.write(f"{idAsignatura}CM{idCM};ContenidoMinimo;;;descripcion;{contenido_limpio}")
                    file.write("\n")
                    file.write(f"{idAsignatura};Asignatura;asignaturaTieneContenidoMinimo;{idAsignatura}CM{idCM}; ; ")
                    file.write("\n")


    file.write("\n")
    
    # Define el patrón de la competencia especifica
    patron_competencias_especificas_catedra = r'(CE\s?\d\.\d\s?:\s[\s\S]*?)(\d)'

    # Encuentra todas las coincidencias de competencias especificas en el texto
    competencias_especificas_catedra = re.findall(patron_competencias_especificas_catedra, texto_extraido_catedra, re.DOTALL)

    # Imprime las competencias encontradas
    for competencia_especifica in competencias_especificas_catedra:
        competencia_especifica_id_descripcion = competencia_especifica[0].replace('\n', '').split(":")
        file.write(f"{competencia_especifica_id_descripcion[0]};CompetenciaEspecifica;;;descripcion;{competencia_especifica_id_descripcion[1]}")
        file.write("\n")
        file.write(f"{idAsignatura};Asignatura;asignaturaTributaACompetencia;{competencia_especifica_id_descripcion[0]}; ; ")
        file.write("\n")
        

    # Define el patrón de la competencia general
    patron_competencias_generales_catedra = r'(CG\s?\d:\s[\s\S]*?)(\d)'

    # Encuentra todas las coincidencias de competencias generales en el texto
    competencias_generales_catedra = re.findall(patron_competencias_generales_catedra, texto_extraido_catedra, re.DOTALL)

    # Imprime las competencias encontradas
    for competencia_general in competencias_generales_catedra:
        competencia_general_id_descripcion = competencia_general[0].replace('\n', '').split(":")
        file.write(f"{competencia_general_id_descripcion[0]};CompetenciaGenerica;;;descripcion;{competencia_general_id_descripcion[1]}")
        file.write("\n")
        file.write(f"{idAsignatura};Asignatura;asignaturaTributaACompetencia;{competencia_general_id_descripcion[0]}; ; ")
        file.write("\n")


    # Define el patrón para los resultados de aprendizaje (RA)
    patron_ra = r'(RA\d+:(.*?))(?=RA\d+|\.)'

    # Encuentra todas las coincidencias de resultados de aprendizaje en el texto
    resultados_aprendizaje = re.findall(patron_ra, texto_extraido_catedra, re.DOTALL)

    nlp = spacy.load('es_core_news_sm')

    addRA = False

    if not resultados_aprendizaje:
        pattern = re.compile(rf"{re.escape('Resultados de aprendizaje')}(.*?){re.escape('Asignaturas correlativas')}", re.DOTALL)
        match = pattern.search(texto_extraido_catedra)

        if match:
            patron_ra = r'(\d+-\s+(.*?))(?=\d+-\s+|\.)'
            # Encuentra todas las coincidencias de resultados de aprendizaje en el texto
            resultados_aprendizaje = re.findall(patron_ra, match.group(1).strip(), re.DOTALL)
            addRA = True
        else:
            file.write("Section not found.")

    for idRA, resultado in enumerate(resultados_aprendizaje, start=1):

        ra_nombre = resultado[0].replace('\n', '').split(":")[-1]
        ra_nombre = re.sub(r"^\d+-\s*", "", ra_nombre)
        file.write(f"RA{idRA};ResultadoAprendizajeAsignatura;;;nombre;{ra_nombre}")
        file.write("\n")
        file.write(f"{idAsignatura};Asignatura;asignaturaTieneRAAsignatura;RA{idRA}; ; ")
        file.write("\n")
        verbo = ra_nombre.split(" ")[0]
        file.write(f"RA{idRA};ResultadoAprendizajeAsignatura;raTieneVerbo;{verbo}; ; ")
        file.write("\n")
        
        # Aplica spaCy al texto
        doc = nlp(resultado[0])
        
        # Filtra palabras que son verbos
        verbos = [token.text for token in doc if token.pos_ == 'VERB']
        
        # Imprime los verbos identificados en el resultado de aprendizaje
        if verbos:
            print(f"Verbos identificados: {', '.join(verbos)}")
            print("Tomando solo el primer verbo:", verbos[0])

    # Patrón de regex para extraer el nombre de la unidad temática
    patron_unidad = r"UNIDAD TEMATICA (\d+):?(\s|-|–)*([\w\s,]+):?"

    patron_unidad_completa = r"UNIDAD TEMATICA \d+:?.*?(?=UNIDAD TEMATICA|Metodología de enseñanza)"

    match_unidades_completa = re.findall(patron_unidad_completa, texto_extraido_catedra, re.DOTALL)

    patron_sinnombre = r"UNIDAD TEMATICA (\d+):?(\s|-|–)*([\w\s,]+):?\s"

    if not match_unidades_completa:
        patron_unidad = r"TEMA (\d+):(\s+)([A-ZÁ-Ú\s]+)([A-ZÁ-Ú][a-zá-ú]+)"
        patron_unidad_completa = r"TEMA \d+:?.*?(?=TEMA|Metodología de enseñanza)"
        match_unidades_completa = re.findall(patron_unidad_completa, texto_extraido_catedra, re.DOTALL)
        patron_sinnombre = r"TEMA (\d+):(\s+)([A-ZÁ-Ú\s]+)(?=[A-ZÁ-Ú][a-zá-ú]+)"

    for idUnidad, match_unidad_completa in enumerate(match_unidades_completa, start=1):
        # Utilizamos una expresión regular para encontrar secuencias de números separadas por espacios y seguidas de un salto de línea
        match_unidad_completa = re.sub(r'\d+(\s\d+)+', '', match_unidad_completa)

        # Buscar información de todas las unidades temáticas
        match_unidades = re.findall(patron_unidad, match_unidad_completa, re.DOTALL)
        for  match_unidad in match_unidades:
            unidad_nombre = match_unidad[2].replace('\n', '')
            file.write(f"{idAsignatura}Unidad{idUnidad};Unidad;;;nombre;{unidad_nombre}")
            file.write("\n")
            file.write(f"{idAsignatura}CM{idUnidad};ContenidoMinimo;contenidoMinimoSeOrganizaEnUnidad;{idAsignatura}Unidad{idUnidad}; ; ")
            file.write("\n")

        # Dividir los temas en oraciones
            match_unidad_completa_sinnombre = re.sub(patron_sinnombre,'',match_unidad_completa)
            temas_divididos = re.split(r'\.\s+', match_unidad_completa_sinnombre)
            # Identificar y combinar subtemas
            temas_final = []
            subtema_actual = ""
            for idTema, temayTopicos in enumerate(temas_divididos, start=1):

                # Regex para capturar "Tema:Tópicos" o "Tema" (sin ":" después)
                regex_tema = r"([^:.]+):?\s*([^.:]*)"  # Captura temas con o sin tópicos

                # Buscar todos los temas y sus posibles tópicos
                coincidencias = re.findall(regex_tema, temayTopicos.replace('\n', ''))

                for tema, contenido in coincidencias:
                    # Limpieza del tema
                    tema = tema.strip()

                    # Procesar los tópicos solo si hay contenido después de ":"
                    if contenido.strip():
                        # Separar los tópicos por comas y "y"
                        topicos = re.split(r",\s*", contenido.strip())
                        if " y " in topicos[-1]:
                            partes = topicos[-1].split(" y ")
                            topicos = topicos[:-1] + partes
                        topicos = [topico.strip() for topico in topicos]  # Limpieza final
                    else:
                        topicos = []  # Si no hay contenido, lista de tópicos vacía

                    file.write(f"{idAsignatura}Unidad{idUnidad}Tema{idTema};Tema;;;nombre;{tema}")
                    file.write("\n")
                    file.write(f"{idAsignatura}Unidad{idUnidad};Unidad;unidadCompuestaDeTema;{idAsignatura}Unidad{idUnidad}Tema{idTema}; ; ")
                    file.write("\n")

                    for idTopico, topico in enumerate(topicos, start=1):
                        topico_nombre = topico.capitalize()
                        file.write(f"{idAsignatura}Unidad{idUnidad}Tema{idTema}Topico{idTopico};Topico;;;nombre;{topico_nombre}")
                        file.write("\n")
                        file.write(f"{idAsignatura}Unidad{idUnidad}Tema{idTema};Tema;temaContieneTopico;{idAsignatura}Unidad{idUnidad}Tema{idTema}Topico{idTopico}; ; ")
                        file.write("\n")
                        
                    

                
                




    