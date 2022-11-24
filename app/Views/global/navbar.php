<nav class="navbar navbar-expand-lg navbar-site mb-4">
    <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0);">Alcaldía de San Salvador</a>

        <?php if(session('Id_Usuario') !== null){ ?>
        <div class="my-2 my-lg-0">
            <form class="d-flex" action="logout" method="get">
                <span href="javascript:void(0);" class="navbar-text"><?php echo session('Nombres') . " " . session('Apellidos') ?> &nbsp;</span>
                <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Cerrar sesión</button>
            </form>
        </div>
        <?php } ?>
    </div>
</nav>