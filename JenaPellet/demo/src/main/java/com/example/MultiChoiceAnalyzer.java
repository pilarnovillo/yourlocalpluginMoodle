package com.example;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

public class MultiChoiceAnalyzer {
    public static void analyze(JsonNode node, List<Question> questions) {
        // Buscamos la pregunta en el campo "question"
        if (node.has("params")) {
            JsonNode params = node.get("params");
            Question question = new Question();
            
            // Extraemos la pregunta
            if (params.has("question")) {
                question.setQuestion(params.get("question").asText());
            }

            // Extraemos las respuestas
            List<Answer> answers = new ArrayList<>();
            if (params.has("answers")) {
                JsonNode answersNode = params.get("answers");
                for (JsonNode answerNode : answersNode) {
                    Answer answer = new Answer();
                    answer.setText(answerNode.get("text").asText());
                    answer.setCorrect(answerNode.get("correct").asBoolean());
                    answers.add(answer);
                }
            }

            // Asignamos las respuestas a la pregunta
            question.setAnswers(answers);
            questions.add(question);
        }
    }
}
