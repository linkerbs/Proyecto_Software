</body>
<!-- modal de cargando -->
<div class="modal fade" id="loadingModal" data-bs-backdrop="static" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                Cargando
            </div>
        </div>
    </div>
</div>
<!-- sweetalert2 -->
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<!-- bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://momentjs.com/downloads/moment.js"></script>
<script src="https://momentjs.com/downloads/moment-with-locales.min.js"></script>
<script src="js/xlsx.bundle.js"></script>
<script src="js/data.js"></script>
<script src="js/print.js"></script>
<script>
    const loadingModal = new bootstrap.Modal(document.getElementById("loadingModal"), {
        keyboard: false
    })

    const loadModal = (type) => {
        if (type === "show") {
            loadingModal.show();
        } else {
            setTimeout(() => {
                loadingModal.hide();
            }, 500);
        }
    }
    // Consultar informacion

    const fromServer = async (data, endpoint) => {
        // Se obtienen los datos
        let config = {
            url: `<?= base_url() ?>/${endpoint}`,
            data,
            method: 'POST',
            dataType: 'json'
        };
        return await $.ajax(config);
    }
</script>

</html>