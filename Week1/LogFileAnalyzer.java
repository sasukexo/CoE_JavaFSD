import java.io.*;
import java.util.*;

public class LogFileAnalyzer {

    private List<String> keywords;

    public LogFileAnalyzer(List<String> keywords) {
        this.keywords = keywords;
    }

    public void analyzeLogFile(String inputFile, String outputFile) {
        Map<String, Integer> keywordCounts = new HashMap<>();

        for (String keyword : keywords) {
            keywordCounts.put(keyword, 0);
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                for (String keyword : keywords) {
                    if (line.contains(keyword)) {
                        keywordCounts.put(keyword, keywordCounts.get(keyword) + 1);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {
            for (Map.Entry<String, Integer> entry : keywordCounts.entrySet()) {
                writer.write(entry.getKey() + ": " + entry.getValue() + " occurrences\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        List<String> keywords = Arrays.asList("ERROR", "WARNING", "INFO");
        LogFileAnalyzer analyzer = new LogFileAnalyzer(keywords);

        String inputFile = "input.log";
        String outputFile = "output.txt";

        analyzer.analyzeLogFile(inputFile, outputFile);

        System.out.println("Log file analysis complete. Results written to " + outputFile);
    }
}