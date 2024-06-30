import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CelularesRegistro({ AccionABMC, Item, Grabar, Volver }) {
  const { register, handleSubmit, formState: { errors, touchedFields, isValid, isSubmitted }, reset } = useForm({ defaultValues: Item });

  const onSubmit = (data) => {
    Grabar(data);
    reset({  // Reset the form to default values after submission
      Id: 0,
      nombre: "",
      fechaIngreso: "",
      marcaCelular_id: 0,
      Activo: true,
    });
  };

  useEffect(() => {
    // Reset form values when the Item changes
    reset(Item);
  }, [Item, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>

          {/* Campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.nombre ? "is-invalid" : "")
                }
              />
              {errors?.nombre && touchedFields.nombre && (
                <div className="invalid-feedback">{errors?.nombre?.message}</div>
              )}
            </div>
          </div>

          {/* Campo FechaIngreso */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaIngreso">
                Fecha Ingreso<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("fechaIngreso", {
                  required: { value: true, message: "Fecha Ingreso es requerido" }
                })}
                className={
                  "form-control " + (errors?.fechaIngreso ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.fechaIngreso?.message}
              </div>
            </div>
          </div>

          {/* Campo marcaCelular_id */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="marcaCelular_id">
                Marca <span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("marcaCelular_id", {
                  required: { value: true, message: "Marca es requerida" },
                })}
                className={
                  "form-control " + (errors?.marcaCelular_id ? "is-invalid" : "")
                }
              />
              {errors?.marcaCelular_id && touchedFields.marcaCelular_id && (
                <div className="invalid-feedback">{errors?.marcaCelular_id?.message}</div>
              )}
            </div>
          </div>

          {/* Campo Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="Activo"
                {...register("Activo", {
                  required: { value: true, message: "Activo es requerido" },
                })}
                className={"form-control" + (errors?.Activo ? " is-invalid" : "")}
              >
                <option value=""></option>
                <option value={false}>NO</option>
                <option value={true}>SI</option>
              </select>
              <div className="invalid-feedback">{errors?.Activo?.message}</div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-success">
                <i className="fa fa-check"></i> Crear Celular
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* Texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}
