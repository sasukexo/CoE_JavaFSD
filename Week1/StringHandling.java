import java.util.*;
class StringHandling{
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter a string");
        String s=sc.nextLine();
        System.out.println("Enter a character to be found in the string");
        char c=sc.next().charAt(0);
        StringHandling obj=new StringHandling();
        System.out.println(obj.find(s,c));
        System.out.println(obj.rev(s));       
        String[] arr=obj.split(s);
        for(String str:arr){
            System.out.println(str.toUpperCase());
        }
        
    }

    public int find(String s,char c){
        int count = 0;
        for(int i=0;i<s.length();i++){
        
            if(s.charAt(i)==c){
                count+=1;
            }
        }
        return count;
    }
    
    public String rev(String s){    
        String rev="";
        for(int i=s.length()-1;i>=0;i--){
            rev+=s.charAt(i);
        }
        return rev;
    }
    public String[] split(String s){
        String[] arr = s.split(" ");
        return arr;
    }
}

