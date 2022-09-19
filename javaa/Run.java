import com.example.RunUser;

class Run {
    public void println(String text) {
        System.out.println(text);
    }

    public static void main(String[] args) {
        RunUser user = new RunUser(12, "tom");
        System.out.println(user.getName());
    }
}