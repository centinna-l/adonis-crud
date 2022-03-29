import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Pet from '../../Models/Pet';
export default class PetsController {
  public async index({ response }: HttpContextContract) {
    let pets = await Pet.all();
    return response.status(200).json({ pets });
  }
  public async store({ request, response }: HttpContextContract) {
    const body = request.body();
    let pet = await Pet.create(body);
    return response.status(201).json({ message: 'Pet Created Successfully', pet });
  }
  public async show({ params, response }: HttpContextContract) {
    let pet = await Pet.findOrFail(params.id);
    return response.status(200).json({ pet });
  }
  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body();
    let pet = await Pet.findOrFail(params.id);
    pet.name = body.name;
    let result = await pet.save();
    return response.status(200).json({ message: result });
  }
  public async destroy({ params, response }: HttpContextContract) {
    let pet = await Pet.findOrFail(params.id);
    pet.delete();
    return response.json({ message: 'Deleted Successfully' });
  }
}
