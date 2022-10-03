/** 
 * This file contains all the constants that are used by the Code Editor / Playground.
 * 
 * Sample Usage: To import bash source, do the following:
 * 
 * import * as codeTemplates from 'Editor/CodeEditor/Template.js';
 * const bashSource = codeTemplates.bashSource;
 * */ 


export const assemblySource = "\
section	.text\n\
    global _start\n\
\n\
_start:\n\
\n\
    xor	eax, eax\n\
    lea	edx, [rax+len]\n\
    mov	al, 1\n\
    mov	esi, msg\n\
    mov	edi, eax\n\
    syscall\n\
\n\
    xor	edi, edi\n\
    lea	eax, [rdi+60]\n\
    syscall\n\
\n\
section	.rodata\n\
\n\
msg	db 'hello, world', 0xa\n\
len	equ	$ - msg\n\
";

export const bashSource = "echo \"hello, world\"";

export const basicSource = "PRINT \"hello, world\"";

export const cSource = "\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf(\"Hello Judge0!\\n\");\n\
    return 0;\n\
}\n\
";

export const csharpSource = "\
public class Hello {\n\
    public static void Main() {\n\
        System.Console.WriteLine(\"hello, world\");\n\
    }\n\
}\n\
";

export const cppSource = "\
#include <iostream>\n\
\n\
int main() {\n\
    // Insert Your Code Here. Here are the steps to get started: \n\
    // Step-I: Define the input format using the examples from the problem description. \n\
    // Step-II: Parse input from standard in. \n\
    // Step-III: Write your algorithm to generate the required output. \n\
    // Note: In case of any issues use #feedback channel on Discord. \n\
    return 0;\n\
}\n\
";

export const competitiveProgrammingSource = "\
#include <algorithm>\n\
#include <cstdint>\n\
#include <iostream>\n\
#include <limits>\n\
#include <set>\n\
#include <utility>\n\
#include <vector>\n\
\n\
using Vertex    = std::uint16_t;\n\
using Cost      = std::uint16_t;\n\
using Edge      = std::pair< Vertex, Cost >;\n\
using Graph     = std::vector< std::vector< Edge > >;\n\
using CostTable = std::vector< std::uint64_t >;\n\
\n\
constexpr auto kInfiniteCost{ std::numeric_limits< CostTable::value_type >::max() };\n\
\n\
auto dijkstra( Vertex const start, Vertex const end, Graph const & graph, CostTable & costTable )\n\
{\n\
    std::fill( costTable.begin(), costTable.end(), kInfiniteCost );\n\
    costTable[ start ] = 0;\n\
\n\
    std::set< std::pair< CostTable::value_type, Vertex > > minHeap;\n\
    minHeap.emplace( 0, start );\n\
\n\
    while ( !minHeap.empty() )\n\
    {\n\
        auto const vertexCost{ minHeap.begin()->first  };\n\
        auto const vertex    { minHeap.begin()->second };\n\
\n\
        minHeap.erase( minHeap.begin() );\n\
\n\
        if ( vertex == end )\n\
        {\n\
            break;\n\
        }\n\
\n\
        for ( auto const & neighbourEdge : graph[ vertex ] )\n\
        {\n\
            auto const & neighbour{ neighbourEdge.first };\n\
            auto const & cost{ neighbourEdge.second };\n\
\n\
            if ( costTable[ neighbour ] > vertexCost + cost )\n\
            {\n\
                minHeap.erase( { costTable[ neighbour ], neighbour } );\n\
                costTable[ neighbour ] = vertexCost + cost;\n\
                minHeap.emplace( costTable[ neighbour ], neighbour );\n\
            }\n\
        }\n\
    }\n\
\n\
    return costTable[ end ];\n\
}\n\
\n\
int main()\n\
{\n\
    constexpr std::uint16_t maxVertices{ 10000 };\n\
\n\
    Graph     graph    ( maxVertices );\n\
    CostTable costTable( maxVertices );\n\
\n\
    std::uint16_t testCases;\n\
    std::cin >> testCases;\n\
\n\
    while ( testCases-- > 0 )\n\
    {\n\
        for ( auto i{ 0 }; i < maxVertices; ++i )\n\
        {\n\
            graph[ i ].clear();\n\
        }\n\
\n\
        std::uint16_t numberOfVertices;\n\
        std::uint16_t numberOfEdges;\n\
\n\
        std::cin >> numberOfVertices >> numberOfEdges;\n\
\n\
        for ( auto i{ 0 }; i < numberOfEdges; ++i )\n\
        {\n\
            Vertex from;\n\
            Vertex to;\n\
            Cost   cost;\n\
\n\
            std::cin >> from >> to >> cost;\n\
            graph[ from ].emplace_back( to, cost );\n\
        }\n\
\n\
        Vertex start;\n\
        Vertex end;\n\
\n\
        std::cin >> start >> end;\n\
\n\
        auto const result{ dijkstra( start, end, graph, costTable ) };\n\
\n\
        if ( result == kInfiniteCost )\n\
        {\n\
            std::cout << \"NO\\n\";\n\
        }\n\
        else\n\
        {\n\
            std::cout << result << '\\n';\n\
        }\n\
    }\n\
\n\
    return 0;\n\
}\n\
";

export const clojureSource = "(println \"hello, world\")\n";

export const cobolSource = "\
IDENTIFICATION DIVISION.\n\
PROGRAM-ID. MAIN.\n\
PROCEDURE DIVISION.\n\
DISPLAY \"hello, world\".\n\
STOP RUN.\n\
";

export const lispSource = "(write-line \"hello, world\")";

export const dSource = "\
import std.stdio;\n\
\n\
void main()\n\
{\n\
    writeln(\"hello, world\");\n\
}\n\
";

export const elixirSource = "IO.puts \"hello, world\"";

export const erlangSource = "\
main(_) ->\n\
    io:fwrite(\"hello, world\\n\").\n\
";

export const executableSource = "\
Judge0 IDE assumes that content of executable is Base64 encoded.\n\
\n\
This means that you should Base64 encode content of your binary,\n\
paste it here and click \"Run\".\n\
\n\
Here is an example of compiled \"hello, world\" NASM program.\n\
Content of compiled binary is Base64 encoded and used as source code.\n\
\n\
https://ide.judge0.com/?kS_f\n\
";

export const fsharpSource = "printfn \"hello, world\"\n";

export const fortranSource = "\
program main\n\
    print *, \"hello, world\"\n\
end\n\
";

export const goSource = "\
package main\n\
\n\
import \"fmt\"\n\
\n\
func main() {\n\
    // Insert Your Code Here. Here are the steps to get started: \n\
    // Step-I: Define the input format using the examples from the problem description. \n\
    // Step-II: Parse input from standard in. \n\
    // Step-III: Write your algorithm to generate the required output. \n\
    // Note: In case of any issues use #feedback channel on Discord. \n\
}\n\
";

export const groovySource = "println \"hello, world\"\n";

export const haskellSource = "main = putStrLn \"hello, world\"";

export const javaSource = "\
public class Main {\n\
    public static void main(String[] args) {\n\
        // Insert Your Code Here. Here are the steps to get started: \n\
        // Step-I: Define the input format using the examples from the problem description. \n\
        // Step-II: Parse input from standard in. \n\
        // Step-III: Write your algorithm to generate the required output. \n\
        // Note: In case of any issues use #feedback channel on Discord. \n\
    }\n\
}\n\
";

export const javaScriptSource = "// Insert Your Code Here. \n\
// Step-I: Define the input format using the examples from the problem description. \n\
// Step-II: Parse input from standard in. \n\
// Step-III: Write your algorithm to generate the required output. \n\
// Note: In case of any issues use #feedback channel on Discord. \n\
";

export const kotlinSource = "\
fun main() {\n\
    println(\"hello, world\")\n\
}\n\
";

export const luaSource = "print(\"hello, world\")";

export const objectiveCSource = "\
#import <Foundation/Foundation.h>\n\
\n\
int main() {\n\
    @autoreleasepool {\n\
        char name[10];\n\
        scanf(\"%s\", name);\n\
        NSString *message = [NSString stringWithFormat:@\"hello, %s\\n\", name];\n\
        printf(\"%s\", message.UTF8String);\n\
    }\n\
    return 0;\n\
}\n\
";

export const ocamlSource = "print_endline \"hello, world\"";

export const octaveSource = "printf(\"hello, world\\n\");";

export const pascalSource = "\
program Hello;\n\
begin\n\
    writeln ('hello, world')\n\
end.\n\
";

export const perlSource = "\
my $name = <STDIN>;\n\
print \"hello, $name\";\n\
";

export const phpSource = "\
<?php\n\
// Insert Your Code Here. Here are the steps to get started: \n\
// Step-I: Define the input format using the examples from the problem description. \n\
// Step-II: Parse input from standard in. \n\
// Step-III: Write your algorithm to generate the required output. \n\
// Note: In case of any issues use #feedback channel on Discord. \n\
?>\n\
";

export const plainTextSource = "hello, world\n";

export const prologSource = "\
:- initialization(main).\n\
main :- write('hello, world\\n').\n\
";

export const pythonSource =  "# Insert Your Code Here. Here are the steps to get started: \n\
# Step-I: Define the input format using the examples from the problem description. \n\
# Step-II: Parse input from standard in. \n\
# Step-III: Write your algorithm to generate the required output. \n\
# Note: In case of any issues use #feedback channel on Discord. \n\
";

export const rSource = "cat(\"hello, world\\n\")";

export const rubySource = "puts \"hello, world\"";

export const rustSource = "\
fn main() {\n\
    println!(\"hello, world\");\n\
}\n\
";

export const scalaSource = "\
object Main {\n\
    def main(args: Array[String]) = {\n\
        val name = scala.io.StdIn.readLine()\n\
        println(\"hello, \"+ name)\n\
    }\n\
}\n\
";

export const sqliteSource = "\
-- On Judge0 IDE your SQL script is run on chinook database (https://www.sqlitetutorial.net/sqlite-sample-database).\n\
-- For more information about how to use SQL with Judge0 API please\n\
-- watch this asciicast: https://asciinema.org/a/326975.\n\
SELECT\n\
    Name, COUNT(*) AS num_albums\n\
FROM artists JOIN albums\n\
ON albums.ArtistID = artists.ArtistID\n\
GROUP BY Name\n\
ORDER BY num_albums DESC\n\
LIMIT 4;\n\
";
export const sqliteAdditionalFiles = "";

export const swiftSource = "\
import Foundation\n\
let name = readLine()\n\
print(\"hello, \\(name!)\")\n\
";

export const typescriptSource = "console.log(\"hello, world\");";

export const vbSource = "\
Public Module Program\n\
   Public Sub Main()\n\
      Console.WriteLine(\"hello, world\")\n\
   End Sub\n\
End Module\n\
";

export const c3Source = "\
// On the Judge0 IDE, C3 is automatically\n\
// updated every hour to the latest commit on master branch.\n\
module main;\n\
\n\
extern func void printf(char *str, ...);\n\
\n\
func int main()\n\
{\n\
    printf(\"hello, world\\n\");\n\
    return 0;\n\
}\n\
";

export const javaTestSource = "\
import static org.junit.jupiter.api.Assertions.assertEquals;\n\
\n\
import org.junit.jupiter.api.Test;\n\
\n\
class MainTest {\n\
    static class Calculator {\n\
        public int add(int x, int y) {\n\
            return x + y;\n\
        }\n\
    }\n\
\n\
    private final Calculator calculator = new Calculator();\n\
\n\
    @Test\n\
    void addition() {\n\
        assertEquals(2, calculator.add(1, 1));\n\
    }\n\
}\n\
";

export const mpiccSource = "\
// Try adding \"-n 5\" (without quotes) into command line arguments. \n\
#include <mpi.h>\n\
\n\
#include <stdio.h>\n\
\n\
int main()\n\
{\n\
    MPI_Init(NULL, NULL);\n\
\n\
    int world_size;\n\
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);\n\
\n\
    int world_rank;\n\
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);\n\
\n\
    printf(\"Hello from processor with rank %d out of %d processors.\\n\", world_rank, world_size);\n\
\n\
    MPI_Finalize();\n\
\n\
    return 0;\n\
}\n\
";

export const mpicxxSource = "\
// Try adding \"-n 5\" (without quotes) into command line arguments. \n\
#include <mpi.h>\n\
\n\
#include <iostream>\n\
\n\
int main()\n\
{\n\
    MPI_Init(NULL, NULL);\n\
\n\
    int world_size;\n\
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);\n\
\n\
    int world_rank;\n\
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);\n\
\n\
    std::cout << \"Hello from processor with rank \"\n\
              << world_rank << \" out of \" << world_size << \" processors.\\n\";\n\
\n\
    MPI_Finalize();\n\
\n\
    return 0;\n\
}\n\
";

export const mpipySource = "\
# Try adding \"-n 5\" (without quotes) into command line arguments. \n\
from mpi4py import MPI\n\
\n\
comm = MPI.COMM_WORLD\n\
world_size = comm.Get_size()\n\
world_rank = comm.Get_rank()\n\
\n\
print(f\"Hello from processor with rank {world_rank} out of {world_size} processors\")\n\
";

export const nimSource = "\
# On the Judge0 IDE, Nim is automatically\n\
# updated every day to the latest stable version.\n\
echo \"hello, world\"\n\
";

export const pythonForMlSource = "\
import mlxtend\n\
import numpy\n\
import pandas\n\
import scipy\n\
import sklearn\n\
\n\
print(\"hello, world\")\n\
";

export const bosqueSource = "\
// On the Judge0 IDE, Bosque (https://github.com/microsoft/BosqueLanguage)\n\
// is automatically updated every hour to the latest commit on master branch.\n\
\n\
namespace NSMain;\n\
\n\
concept WithName {\n\
    invariant $name != \"\";\n\
\n\
    field name: String;\n\
}\n\
\n\
concept Greeting {\n\
    abstract method sayHello(): String;\n\
    \n\
    virtual method sayGoodbye(): String {\n\
        return \"goodbye\";\n\
    }\n\
}\n\
\n\
entity GenericGreeting provides Greeting {\n\
    const instance: GenericGreeting = GenericGreeting@{};\n\
\n\
    override method sayHello(): String {\n\
        return \"hello world\";\n\
    }\n\
}\n\
\n\
entity NamedGreeting provides WithName, Greeting {\n\
    override method sayHello(): String {\n\
        return String::concat(\"hello\", \" \", this.name);\n\
    }\n\
}\n\
\n\
entrypoint function main(arg?: String): String {\n\
    export const val = arg ?| \"\";\n\
    if (val == \"1\") {\n\
        return GenericGreeting@{}.sayHello();\n\
    }\n\
    elif (val == \"2\") {\n\
        return GenericGreeting::instance.sayHello();\n\
    }\n\
    else {\n\
        return NamedGreeting@{name=\"bob\"}.sayHello();\n\
    }\n\
}\n\
";

export const cppTestSource = "\
#include <gtest/gtest.h>\n\
\n\
int add(int x, int y) {\n\
    return x + y;\n\
}\n\
\n\
TEST(AdditionTest, NeutralElement) {\n\
    EXPECT_EQ(1, add(1, 0));\n\
    EXPECT_EQ(1, add(0, 1));\n\
    EXPECT_EQ(0, add(0, 0));\n\
}\n\
\n\
TEST(AdditionTest, CommutativeProperty) {\n\
    EXPECT_EQ(add(2, 3), add(3, 2));\n\
}\n\
\n\
int main(int argc, char **argv) {\n\
    ::testing::InitGoogleTest(&argc, argv);\n\
    return RUN_ALL_TESTS();\n\
}\n\
";

export const csharpTestSource ="\
using NUnit.Framework;\n\
\n\
public class Calculator\n\
{\n\
    public int add(int a, int b)\n\
    {\n\
        return a + b;\n\
    }\n\
}\n\
\n\
[TestFixture]\n\
public class Tests\n\
{\n\
    private Calculator calculator;\n\
\n\
    [SetUp]\n\
    protected void SetUp()\n\
    {\n\
        calculator = new Calculator();\n\
    }\n\
\n\
    [Test]\n\
    public void NeutralElement()\n\
    {\n\
        Assert.AreEqual(1, calculator.add(1, 0));\n\
        Assert.AreEqual(1, calculator.add(0, 1));\n\
        Assert.AreEqual(0, calculator.add(0, 0));\n\
    }\n\
\n\
    [Test]\n\
    public void CommutativeProperty()\n\
    {\n\
        Assert.AreEqual(calculator.add(2, 3), calculator.add(3, 2));\n\
    }\n\
}\n\
";