<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publicaciones;

class PublicacionesController extends Controller
{
    public function store(Request $request) {

        $publicaciones = new Publicaciones;

        $publicaciones->save($request);
    }

    public function show() {

    }
}
