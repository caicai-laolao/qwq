
import com.example.Aniuser;

class Animal {
    public void println(String text) {
        System.out.println(text);
    }

    public static void main(String[] args) {
        Aniuser user = new Aniuser("斑马", 12);
        System.out.println(user.getName());
    }
}