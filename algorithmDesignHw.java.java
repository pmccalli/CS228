import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

import java.io.*;

class Main {

  private static class ReturnBlob {
    List<Integer> L;
    int moves;
    public ReturnBlob(List<Integer> L, int moves) {
      this.L = L;
      this.moves = moves;
    }
  }



  public static void main(String[] args) {
    /* Sort-and-Count(L) {
      if list L has one element
        return 0 and the list L;
      Divide the list into two halves A and B;
      (rA, A)  Sort-and-Count(A);
      (rB, B)  Sort-and-Count(B);
      (rB, L)  Merge-and-Count(A, B);
      return r = rA + rB + r and the sorted list L;
    };
    */

    Scanner sc = new Scanner(System.in);
    System.out.println("addfile name please");
    String filename = sc.nextLine();

    try {

      Scanner fin = new Scanner(new File(filename));
    
      List<Integer> L = new ArrayList<Integer>();
      while(fin.hasNextInt()) {

        int x = fin.nextInt();
        L.add(x);
      }
      
      //recurse(5);
      System.out.println("Unsorted List: " + L);
      ReturnBlob rb = SortandCount(L, "");
      L = rb.L;
      int moves = rb.moves;
      System.out.println("Sorted List: " + L);
      System.out.println("Moves: " + moves);
    }
    catch(Exception ex) {
      ex.printStackTrace();
    }

  }

  public static void recurse(int x) {
    if(x == 0) {
      System.out.println("ZERO");
      return;
    }

    System.out.println("About to recurse on " + x);
    recurse(x - 1);
    System.out.println("Recursed on " + x);
  }



  public static ReturnBlob SortandCount(List<Integer> L, String pad){
    System.out.println(pad+"Recursing on " + L);

    // if list size is 1, return the list and zero.
    if(L.size() == 1){
      ReturnBlob rb = new ReturnBlob(L, 0);
      return rb;
    }

    if(L.size() == 0) {
      System.out.println(pad+"Doesn't say");
      ReturnBlob rb = new ReturnBlob(L, 0);
      return rb;
    }



    // otherwise split list in half
    int half = L.size()/2;
    System.out.println(pad+"Slice 0 to " + half);
    List<Integer> La = L.subList(0, half);
    System.out.println(pad+"Slice " + (half) + " to " + L.size());
    List<Integer> Lb = L.subList(half, L.size());

    // recurse on each half (which will result in both halves sorted)
    System.out.println(pad+"recursing on halves " + La + " and " + Lb);
    ReturnBlob rba = SortandCount(La, pad + "\t");
    ReturnBlob rbb = SortandCount(Lb, pad + "\t");
    System.out.println(pad+"Recursion finished: " + rba.L + " and " + rbb.L);
    
    // get returned lists back into La and Lb, set rA and Rb
    La = rba.L;
    Lb = rbb.L;
    int rA = rba.moves;
    int rB = rbb.moves;
    System.out.println(rA +rB);
    // create holding container for merged lists
    List<Integer> merged = new ArrayList<Integer>();

    // left i and right i will go throgh lists A and B respectively
    int ai = 0;
    int bi = 0;
    
    // mysterious r variable
    int r = 0;
    
    // leftIndex must reach the end of listA and same with B on the right
    while(ai < La.size() || bi < Lb.size()) {
      // decide which to take:
      // when to take from lista:
      // right index at end?  take from A || both not at end and L is smaller
      if(bi == Lb.size() || ai < La.size() && La.get(ai) < Lb.get(bi)) {
        merged.add(La.get(ai));
        ai++;
      }
      else {
        merged.add(Lb.get(bi));
        bi++;
        System.out.println("Increased " + r + " to " + (r+1));
      }
    }
    System.out.println(pad+"FROM " + L + ", Merged " + La + " and " + Lb + " -> " + merged);
    
    List<Integer> lazyMerge = new ArrayList<Integer>();
    for(int i=0;i<La.size();i++) {
      lazyMerge.add(La.get(i));
    }
    for(int i=0;i<Lb.size();i++) {
      lazyMerge.add(Lb.get(i));
    }

    for(int i=0;i<L.size();i++) {
      for(int j=0;j<merged.size();j++) {
        if(lazyMerge.get(i) == merged.get(j) && i > j) {
          System.out.println(lazyMerge.get(i) + " is in index " + i + " but should be index " + j + " -> " + Math.abs(i-j) + " moves");

          r += Math.abs(i-j);
        }
      }
    }

    ReturnBlob rb = new ReturnBlob(merged, rA + rB + r);
    return rb;
  }


}



//function that finds lowest value between two lists
////returns that lowest value
//