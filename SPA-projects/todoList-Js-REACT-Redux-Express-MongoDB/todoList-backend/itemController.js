import items from './items.js'

class itemController {

    async create(request, response) {

        const todo = new items(request.body);
        todo.save((err, task) => {
            if (err || !task) {
                return response.status(500).json({
                    error: 'Oops, error',
                });
            }
            response.json({ task });
        });
    }

    async getAllItems(request, response) {
        try {
            const allItems = await items.find();
            return response.json(allItems)

        } catch (e) {
            response.status(500).json(e)
        }
    }

    async updateOne(request, response) {
        try {
            const { id } = request.params;
            const { checked } = request.body;

            await items.findByIdAndUpdate(id, { checked: checked });

            return response.json('OK');
        } catch (e) {
            response.status(500).json(e);
        }
    }

    async updateMany(request, response) {
        try {
            const item = request.body;

            const itemToUpdate = {
                value: item.value,
                checked: item.checked
            }

            const updatedItems = await items.updateMany({}, itemToUpdate, {
                new: true,
            });
            return response.json(updatedItems);
        } catch (e) {
            response.status(500).json(e);
        }
    }

    async delete(request, response) {
        try {
            const { id } = request.params

            await items.findByIdAndDelete(id);
            return response.json(items)

        } catch (e) {
            response.status(500).json(e)
        }
    }

    async deleteChecked(request, response) {

        const itemId = request.body.itemId;

        try {
          await items.deleteMany({
            _id: { $in: itemId }
          });
          return response.json({status: 'OK'});
        } catch (e) {
            response.status(500).json(e);
        }
      }

    //   deleteChecked = async (req, res) => {
    //     const ids = req.body.ids;
    //     try {
    //         console.log('22222222');
    //       await todosModel.deleteMany({
    //         _id: { $in: ids }
    //       });
    //       return res.json({status: 'ok'});
    //     } catch (error) {
    //       return res.json({status: 'error', error})
    //     }
    //   }
}

export default new itemController;