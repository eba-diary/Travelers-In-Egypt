import React from 'react';
import HistoricalMarkupToolTest from './HistoricalMarkupToolTest';

// axios.post in xmloutputeditor
// async function 
// click form button, link to /HistoricalMarkupTool/output
//

function MarkupTool() {
    return (
        <div>
            <HistoricalMarkupToolTest />
        </div>
    )

}

// function MarkupForm() {
//     const getFormValueFromName = (nameField) => {
//         let value = document.getElementsByName(nameField)[0].value;
//         return value;
//     }

//     const handleSubmit = (e) => {
//         let title = getFormValueFromName('teiHeaderTitle');
//         let author = getFormValueFromName('teiHeaderAuthor');
//         let editor = getFormValueFromName('teiHeaderEditor');
//         let publisher = getFormValueFromName('teiHeaderPublisher');
//         let pAddress = getFormValueFromName('teiHeaderPublisherAddress');
//         let date = getFormValueFromName('teiHeaderPublicationDate');
//         let license = getFormValueFromName('teiHeaderLicense');
//         let srcDesc = getFormValueFromName('teiHeaderSourceDescription');
//         let projDesc = getFormValueFromName('teiHeaderProjectDescription');
//         let text = getFormValueFromName('rawText');

//         let dataJson = {
//             teiHeaderTitle: title,
//             teiHeaderAuthor: author,
//             teiHeaderEditor: editor,
//             teiHeaderPublisher: publisher,
//             teiHeaderPublisherAddress: pAddress,
//             teiHeaderPublicationDate: date,
//             teiHeaderLicense: license,
//             teiHeaderSourceDescription: srcDesc,
//             teiHeaderProjectDescription: projDesc,
//             rawText: text
//         }
//         console.log(dataJson);
//         axios.post("/HistoricalMarkupTool/output", dataJson)
//         .then((res) => {
//             setData(res.data);
//         }).catch((err) => {
//             console.log(err);
//         });
//     };

//     let markupForm = 
//         <div>
//             <div class="container">
//                 <div class="alert alert-info" role="info">
//                     <h3>How it works</h3>
//                     <p>Paste your plain text into the box below. Click submit when you are ready. This may take a few minutes, especially if you are submitting a long text.</p>
//                     <p>Once your markup is ready, you will be able to make any edits and download the output.</p>
//                 </div>
//             </div>

//             <div class="container">
//                 <form action='/HistoricalMarkupTool/output' onSubmit={handleSubmit}>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Title</label>
//                         <div class="col-sm-5">
//                             <input type="text" class="form-control form-control-sm" name="teiHeaderTitle"/>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Author</label>
//                         <div class="col-sm-4">
//                             <input type="text" class="form-control form-control-sm" name="teiHeaderAuthor"/>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Editor</label>
//                         <div class="col-sm-4">
//                             <input type="text" class="form-control form-control-sm" name="teiHeaderEditor"/>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Publisher</label>
//                         <div class="col-sm-7">
//                             <input type="text" class="form-control form-control-sm" name="teiHeaderPublisher"/>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Publisher Address</label>
//                         <div class="col-sm-7">
//                             <input type="text" class="form-control form-control-sm" name="teiHeaderPublisherAddress"/>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Publication Date</label>
//                         <div class="col-sm-2">
//                             <input type="text" class="form-control form-control-sm" name="teiHeaderPublicationDate"/>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">License <span class="badge badge-info">New</span></label>
//                         <div class="col-sm-6">
//                             <select type="text" class="form-control form-control-sm" name="teiHeaderLicense">
//                             <option value="CC_Attr_NonComm">Creative Commons Attribution-NonCommercial 4.0 International</option>
//                             <option value="CC_Attr">Creative Commons Attribution 4.0 International</option>
//                             <option value="CC_Attr_ShareAlike">Creative Commons Attribution-ShareAlike 4.0 International</option>
//                             <option value="CC_Attr_NonComm_ShareAlike">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Source Description <span class="badge badge-info">New</span></label>
//                         <div class="col-sm-10">
//                             <textarea type="text" rows="2" cols="5" class="form-control"  name="teiHeaderSourceDescription"></textarea>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Project Description <span class="badge badge-info">New</span></label>
//                         <div class="col-sm-10">
//                             <textarea type="text" rows="2" cols="5" class="form-control"  name="teiHeaderProjectDescription"></textarea>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <label class="col-sm-2">Your Text <font color="red">* </font></label>
//                         <div class="col-sm-10">
//                             <textarea type="text" rows="5" cols="5" class="form-control"  name="rawText" required="true"></textarea>
//                         </div>
//                     </div>
//                     <div class="form-group row">
//                         <div class="col-sm-10">
//                             <button type="reset" class="btn btn-primary"> Clear</button>
//                             <button type="submit" class="btn btn-info" onClick={() => window.location.href + "/output"}>Submit</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     ;

//     return (
//         <div>
//             {markupForm}
//         </div>
//     );
    
// }

export default MarkupTool;