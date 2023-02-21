import React from 'react'

export const Share = () => {
    return (
        <center>
            <h1>My Access</h1>
            <div class="container" style={{ padding: "2rem 0rem" }}>
                {/* <div class="container" style={{ padding: "2rem 0rem" }}> */}
                <div class="row">
                    <div class="col-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>0x896dfr65fr65t46gtr6g46r4</td>
                                    <td>
                                        <button type="button" class="btn btn-danger"><i class="far fa-trash-alt">Revoke</i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </center>
    )
}
