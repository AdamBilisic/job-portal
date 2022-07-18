import { ProfileDto } from "../types/profile.dto";
import { Profile } from "../models/profile.model";

export const getProfile = async (req, res, next) => {
    const profile: ProfileDto = await Profile.findOne({where: {id: req.get('profile_id') || 0}})
    if(!profile) return res.status(401).end()
    req.profile = profile
    next()
}
