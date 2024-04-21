<script setup>

</script>

<template>
    <div class="modal-bg-color"></div>
    <div class="modal-bg">
        
        <div class="modal">
            <span class="modal-button-close" @click="$emit('close')">
                <img src="@/assets/icons/close.svg" alt="">
            </span>

            <div class="modal-content">
                <div class="modal-content-text">
                    This is a simple modal.
                </div>   
                <div class="modal-content-description">
                    Will you accept cookies?
                </div>                   
            </div>            
        </div>
        
    </div>
    
</template>

<style scoped>
    .modal-bg {
        /* background-color: aqua;  */

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .modal-bg-color {
        background-color: #000;
        
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        opacity: 0.6;   
    }    
    .modal{
        background-color: #f1f1f1;

        margin: auto;  
        padding: 15px;      

        max-width: 900px;
        width: 95%;

        display: flex;
        flex-direction: column;

        border-radius: 7px;

        color: #111;
    }
    .modal-button-close {
        /* background-color: #888; */

        width: 20px;
        height: 20px;
        
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: flex-end;
        
        font-size: 16pt;

        cursor: pointer;
    }
    .modal-button-close img {
        width: 40px;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }doal

    .modal-content-text {
        text-align: center;
        font-weight: bold;
        font-size: 18pt;
    }
    .modal-content-description {
        text-align: center;
        font-size: 12pt;
    }

</style>