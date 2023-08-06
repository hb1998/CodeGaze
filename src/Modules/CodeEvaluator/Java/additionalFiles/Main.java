import com.fasterxml.jackson.databind.ObjectMapper;

public class Main {
    public static void main(String[] args) {
        String jsonString = "[{  \"A\":11 ,  \"B\": \"test\",  \"C\": 1000}]";
        System.out.println(getObject(jsonString));
    }

    public static Object getObject(String jsonString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Object object = mapper.readValue(jsonString, Object.class);
            return object;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
