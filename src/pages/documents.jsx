// import { Upload, FileText, Trash2, Download, Search, Calendar, Users, Scale } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { useState } from "react";
// import { useToast } from "../hooks/use-toast";

// export default function Documents() {
//   const [documents, setDocuments] = useState([
//     {
//       id: "1",
//       name: "Contract Agreement.pdf",
//       type: "PDF",
//       uploadDate: "2025-01-10",
//       size: "2.4 MB",
//       analyzed: true,
//       analysis: {
//         documentType: "Employment Contract",
//         keyDates: ["2024-01-15", "2024-06-30", "2025-01-15"],
//         parties: ["John Doe", "ABC Corporation"],
//         relevantSections: [
//           "Section 10 - Contract Act, 1872",
//           "Section 27 - Contract Act, 1872",
//         ],
//       },
//     },
//     {
//       id: "2",
//       name: "Property Deed.pdf",
//       type: "PDF",
//       uploadDate: "2025-01-08",
//       size: "1.8 MB",
//     },
//   ]);
//   const [analyzing, setAnalyzing] = useState(null);
//   const { toast } = useToast();

//   const handleFileUpload = (event) => {
//     const files = event.target.files;
//     if (files) {
//       Array.from(files).forEach((file) => {
//         const newDoc = {
//           id: Date.now().toString() + Math.random(),
//           name: file.name,
//           type: file.type.includes("pdf") ? "PDF" : "DOCX",
//           size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
//           uploadDate: new Date().toISOString().split("T")[0],
//           analyzed: false,
//         };
//         setDocuments((prev) => [...prev, newDoc]);
        
//         toast({
//           title: "Document uploaded",
//           description: `${file.name} has been uploaded successfully.`,
//         });
//       });
//     }
//   };

//   const handleAnalyze = (docId) => {
//     setAnalyzing(docId);
    
//     setTimeout(() => {
//       setDocuments((prev) =>
//         prev.map((doc) =>
//           doc.id === docId
//             ? {
//                 ...doc,
//                 analyzed: true,
//                 analysis: {
//                   documentType: "Legal Agreement",
//                   keyDates: ["2024-01-15", "2024-06-30", "2025-01-15"],
//                   parties: ["John Doe", "ABC Corporation", "XYZ Legal Firm"],
//                   relevantSections: [
//                     "Section 10 - Contract Act, 1872",
//                     "Section 73 - Contract Act, 1872",
//                     "Article 226 - Constitution of India",
//                   ],
//                 },
//               }
//             : doc
//         )
//       );
//       setAnalyzing(null);
      
//       toast({
//         title: "Analysis complete",
//         description: "Document has been analyzed successfully.",
//       });
//     }, 2000);
//   };

//   const handleDelete = (docId) => {
//     setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
//     toast({
//       title: "Document deleted",
//       description: "Document has been removed successfully.",
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold mb-2">Documents</h1>
//         <p className="text-muted-foreground">
//           Upload and analyze your legal documents with AI assistance
//         </p>
//       </div>

//       {/* Upload Card */}
//       <Card className="card-glow bg-gradient-glow border-border">
//         <CardHeader>
//           <CardTitle>Upload Document</CardTitle>
//           <CardDescription>
//             Upload PDF, DOCX, or other legal documents for AI analysis
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <label htmlFor="file-upload" className="block">
//             <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
//               <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
//               <p className="text-sm text-muted-foreground mb-2">
//                 Click to upload or drag and drop
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 PDF, DOCX, or TXT (max 10MB)
//               </p>
//             </div>
//             <input
//               id="file-upload"
//               type="file"
//               className="hidden"
//               accept=".pdf,.docx,.txt"
//               multiple
//               onChange={handleFileUpload}
//             />
//           </label>
//         </CardContent>
//       </Card>

//       {/* Documents List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
//         <div className="space-y-4">
//           {documents.map((doc) => (
//             <Card key={doc.id} className="card-glow bg-card border-border">
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <FileText className="h-8 w-8 text-primary" />
//                     <div>
//                       <p className="font-medium">{doc.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {doc.type} • {doc.size} • {doc.uploadDate}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     {!doc.analyzed && (
//                       <Button
//                         onClick={() => handleAnalyze(doc.id)}
//                         disabled={analyzing === doc.id}
//                         className="bg-gradient-primary shadow-glow"
//                       >
//                         <Search className="h-4 w-4 mr-2" />
//                         {analyzing === doc.id ? "Analyzing..." : "Analyze"}
//                       </Button>
//                     )}
//                     <Button variant="outline" size="icon" className="border-border">
//                       <Download className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => handleDelete(doc.id)}
//                       className="border-border hover:bg-destructive/10 hover:border-destructive"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 {doc.analyzed && doc.analysis && (
//                   <div className="mt-4 space-y-4 border-t border-border pt-4">
//                     <div className="flex items-center gap-2 mb-3">
//                       <Badge className="bg-primary/10 text-primary border-primary/20">
//                         Analysis Complete
//                       </Badge>
//                     </div>

//                     <div className="grid gap-4 md:grid-cols-2">
//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm font-medium">
//                           <FileText className="h-4 w-4 text-primary" />
//                           Document Type
//                         </div>
//                         <p className="text-sm text-muted-foreground pl-6">
//                           {doc.analysis.documentType}
//                         </p>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm font-medium">
//                           <Calendar className="h-4 w-4 text-primary" />
//                           Key Dates
//                         </div>
//                         <div className="pl-6 space-y-1">
//                           {doc.analysis.keyDates.map((date, i) => (
//                             <p key={i} className="text-sm text-muted-foreground">
//                               {date}
//                             </p>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm font-medium">
//                           <Users className="h-4 w-4 text-primary" />
//                           Parties Involved
//                         </div>
//                         <div className="pl-6 space-y-1">
//                           {doc.analysis.parties.map((party, i) => (
//                             <p key={i} className="text-sm text-muted-foreground">
//                               {party}
//                             </p>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <div className="flex items-center gap-2 text-sm font-medium">
//                           <Scale className="h-4 w-4 text-primary" />
//                           Relevant Legal Sections
//                         </div>
//                         <div className="pl-6 space-y-1">
//                           {doc.analysis.relevantSections.map((section, i) => (
//                             <p key={i} className="text-sm text-muted-foreground">
//                               {section}
//                             </p>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { Upload, FileText, Trash2, Download, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [analyzing, setAnalyzing] = useState(null);
  const { toast } = useToast();

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          file: file,
          type: file.type.includes("pdf") ? "PDF" : "DOCX",
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          uploadDate: new Date().toISOString().split("T")[0],
          analyzed: false,
        };
        setDocuments((prev) => [...prev, newDoc]);

        toast({
          title: "✅ Document added",
          description: `${file.name} ready to analyze.`,
        });
      });
    }
  };

  // const handleAnalyze = async (docId) => {
  //   const doc = documents.find((d) => d.id === docId);
  //   if (!doc) return;

  //   setAnalyzing(docId);

  //   const formData = new FormData();
  //   formData.append("name", "Vijay");
  //   formData.append("email", "vijaypvk001@gmail.com");
  //   formData.append("data", doc.file);
    

  //   try {
  //     await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     setDocuments((prev) =>
  //       prev.map((d) =>
  //         d.id === docId ? { ...d, analyzed: true } : d
  //       )
  //     );

  //     toast({
  //       title: "📧 Document sent",
  //       description: "Summary will be sent to vijaypvk001@gmail.com",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     toast({
  //       title: "❌ Error",
  //       description: "Failed to send document for analysis.",
  //       variant: "destructive",
  //     });
  //   }

  //   setAnalyzing(null);
  // };
const handleAnalyze = async (docId) => {
  const doc = documents.find((d) => d.id === docId);
  if (!doc || !(doc.file instanceof Blob)) return;

  setAnalyzing(docId);

  const formData = new FormData();
  formData.append("name", "Vijay");
  formData.append("email", "vijaypvk001@gmail.com");
  formData.append("data", doc.file, doc.name);

  try {
    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, analyzed: true } : d
      )
    );

    toast({
      title: "📧 Document sent",
      description: "Summary will be sent to vijaypvk001@gmail.com",
    });
  } catch (err) {
    console.error(err);
    toast({
      title: "❌ Error",
      description: "Failed to send document for analysis.",
      variant: "destructive",
    });
  }

  setAnalyzing(null);
};


  const handleDelete = (docId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    toast({
      title: "🗑️ Deleted",
      description: "Document removed from list.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Documents</h1>
        <p className="text-muted-foreground">Upload and analyze your legal documents</p>
      </div>

      {/* Upload Card */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg border-none">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>PDF or DOCX (max 10MB)</CardDescription>
        </CardHeader>
        <CardContent>
          <label htmlFor="file-upload" className="block cursor-pointer">
            <div className="border-2 border-dashed border-white rounded-lg p-8 text-center hover:bg-white/10 transition">
              <Upload className="mx-auto h-12 w-12 mb-2" />
              <p>Click to upload or drag and drop</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
            />
          </label>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="shadow-lg border-none bg-white/5 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-3">
                    <FileText className="text-purple-400 h-8 w-8" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-white/70">
                        {doc.type} • {doc.size} • {doc.uploadDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!doc.analyzed && (
                      <Button
                        onClick={() => handleAnalyze(doc.id)}
                        disabled={analyzing === doc.id}
                        className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                      >
                        {analyzing === doc.id ? (
                          <span className="animate-spin">⏳</span>
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                        {analyzing === doc.id ? "Sending..." : "Analyze"}
                      </Button>
                    )}

                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>

                    <Button variant="destructive" size="icon" onClick={() => handleDelete(doc.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {doc.analyzed && (
                  <Badge className="bg-green-600 text-white">✅ Sent to email: vijaypvk001@gmail.com</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
