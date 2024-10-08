package com.example;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

public class SingleChoiceAnalyzer {
    public static void analyze(JsonNode node, List<Question> questions) {
        // Verificamos que el nodo tiene el campo "params"
        if (node.has("params")) {
            JsonNode params = node.get("params");

            // Extraemos las opciones de pregunta
            if (params.has("choices")) {
                JsonNode choicesNode = params.get("choices");
                for (JsonNode choiceNode : choicesNode) {
                    Question question = new Question();
                    
                    // Extraemos el ID del subcontenido y la pregunta
                    question.setQuestion(choiceNode.get("question").asText());

                    // Extraemos las respuestas
                    List<Answer> answers = new ArrayList<>();
                    if (choiceNode.has("answers")) {
                        JsonNode answersNode = choiceNode.get("answers");
                        boolean isFirstAnswer = true; // Variable para determinar si es la primera respuesta

                        for (JsonNode answerNode : answersNode) {
                            Answer answer = new Answer();
                            answer.setText(answerNode.asText());

                            // Solo la primera respuesta se marca como correcta
                            answer.setCorrect(isFirstAnswer);
                            isFirstAnswer = false; // Cambiar a false después de la primera respuesta

                            answers.add(answer);
                        }
                    }

                    // Asignamos las respuestas a la pregunta
                    question.setAnswers(answers);
                    questions.add(question);
                }
            }
        }
    }
}
