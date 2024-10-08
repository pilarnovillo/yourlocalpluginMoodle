// package com.example;

// import java.io.File;
// import java.util.ArrayList;
// import java.util.List;

// public class H5PAnalyzer {

//     public static void main(String[] args) throws Exception {
//         // Cargar el archivo content.json
//         ObjectMapper mapper = new ObjectMapper();
//         JsonNode root = mapper.readTree(new File("path/to/content.json"));

//         List<Question> questions = new ArrayList<>();
//         List<MediaContent> mediaContents = new ArrayList<>();

//         // Analizar el JSON
//         analyzeNode(root, questions, mediaContents);

//         // Imprimir resultados
//         questions.forEach(System.out::println);
//         mediaContents.forEach(System.out::println);
//     }

//     // Método recursivo para analizar nodos
//     public static void analyzeNode(JsonNode node, List<Question> questions, List<MediaContent> mediaContents) {
//         // Analizar H5P.MultiChoice, H5P.SingleChoice y H5P.TrueFalse
//         if (node.has("library")) {
//             String library = node.get("library").asText();
//             if (library.startsWith("H5P.MultiChoice") || library.startsWith("H5P.SingleChoiceSet") || library.startsWith("H5P.TrueFalse")) {
//                 Question question = new Question();
//                 question.setQuestion(node.get("params").get("question").asText());

//                 List<Answer> answers = new ArrayList<>();
//                 JsonNode answersNode = node.get("params").get("answers") != null
//                         ? node.get("params").get("answers")
//                         : node.get("params").get("alternatives");

//                 if (answersNode != null) {
//                     for (JsonNode answerNode : answersNode) {
//                         Answer answer = new Answer();
//                         answer.setText(answerNode.get("text").asText());
//                         answer.setCorrect(answerNode.get("correct").asBoolean());
//                         answers.add(answer);
//                     }
//                 } else if (node.get("params").has("correct")) {
//                     // Para H5P.TrueFalse
//                     Answer answer = new Answer();
//                     answer.setCorrect(node.get("params").get("correct").asBoolean());
//                     answers.add(answer);
//                 }
//                 question.setAnswers(answers);
//                 questions.add(question);
//             }

//             // Analizar contenido anidado en H5P.Column, H5P.CoursePresentation, H5P.Accordion
//             if (library.startsWith("H5P.Column") || library.startsWith("H5P.CoursePresentation") || library.startsWith("H5P.Accordion")) {
//                 JsonNode contentNode = node.get("params").get("content") != null
//                         ? node.get("params").get("content")
//                         : node.get("params").get("slides");

//                 if (contentNode != null) {
//                     for (JsonNode childNode : contentNode) {
//                         analyzeNode(childNode, questions, mediaContents);
//                     }
//                 }
//             }

//             // Analizar contenido multimedia
//             if (library.startsWith("H5P.Image")) {
//                 MediaContent media = new MediaContent();
//                 media.setType("Image");
//                 media.setPath(node.get("params").get("file").get("path").asText());
//                 mediaContents.add(media);
//             }
//             if (library.startsWith("H5P.Video")) {
//                 MediaContent media = new MediaContent();
//                 media.setType("Video");
//                 media.setPath(node.get("params").get("sources").get(0).get("path").asText());
//                 mediaContents.add(media);
//             }
//         }
//     }
// }
