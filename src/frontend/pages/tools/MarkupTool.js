import React from 'react';

function MarkupTool() {
    let test = 
        <div>
            <div class="container">
                <div class="alert alert-info" role="info">
                    <h3>How it works</h3>
                    <p>Paste your plain text into the box below. Click submit when you are ready. This may take a few minutes, especially if you are submitting a long text.</p>
                    <p>Once your markup is ready, you will be able to make any edits and download the output.</p>
                </div>
            </div>

            <div class="container">
                <form method="POST" action="/">
                    <div class="form-group row">
                        <label class="col-sm-2">Title</label>
                        <div class="col-sm-5">
                            <input type="text" class="form-control form-control-sm" name="teiHeaderTitle"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Author</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control form-control-sm" name="teiHeaderAuthor"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Editor</label>
                        <div class="col-sm-4">
                            <input type="text" class="form-control form-control-sm" name="teiHeaderEditor"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Publisher</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm" name="teiHeaderPublisher"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Publisher Address</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control form-control-sm" name="teiHeaderPublisherAddress"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Publication Date</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control form-control-sm" name="teiHeaderPublicationDate"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">License <span class="badge badge-info">New</span></label>
                        <div class="col-sm-6">
                            <select type="text" class="form-control form-control-sm" name="teiHeaderLicense">
                            <option value="CC_Attr_NonComm">Creative Commons Attribution-NonCommercial 4.0 International</option>
                            <option value="CC_Attr">Creative Commons Attribution 4.0 International</option>
                            <option value="CC_Attr_ShareAlike">Creative Commons Attribution-ShareAlike 4.0 International</option>
                            <option value="CC_Attr_NonComm_ShareAlike">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Source Description <span class="badge badge-info">New</span></label>
                        <div class="col-sm-10">
                            <textarea type="text" rows="2" cols="5" class="form-control"  name="teiHeaderSourceDescription"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Project Description <span class="badge badge-info">New</span></label>
                        <div class="col-sm-10">
                            <textarea type="text" rows="2" cols="5" class="form-control"  name="teiHeaderProjectDescription"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2">Your Text <font color="red">* </font></label>
                        <div class="col-sm-10">
                            <textarea type="text" rows="5" cols="5" class="form-control"  name="rawText" required="true"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="reset" class="btn btn-primary"> Clear</button>
                            <button type="submit" class="btn btn-info"> Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>;

    return(test);
}

export default MarkupTool;