<?php
echo view('global/header');
echo view('global/navbar');
?>

<div class="container-fluid">
    <div class="position-relative">
        <div class="position-absolute top-0 start-50 translate-middle-x">
            <div class="row">
                <div class="col-12">
                    <h1>Login</h1>
                    <hr>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12">
                    <form action="login" method="POST">
                        <div class="col-12 row m-0">
                            <div class="col-12 my-2">
                                <label for="username" class="form-label">Usuario</label>
                                <input type="text" class="form-control" id="username" name="username" aria-describedby="username">
                            </div>
                            <div class="col-12 my-2">
                                <label for="password" class="form-label">Contraseña</label>
                                <input type="password" class="form-control" id="password" name="password" aria-describedby="password">
                            </div>
                        </div>
                        <div class="position-relative">
                            <div class="position-absolute top-0 start-50 translate-middle-x">
                                <button type="submit" class="btn btn-outline-dark btn-login my-3">Entrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    

    <?php echo view('global/footer'); ?>